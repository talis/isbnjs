var request = require('request'),
    xml2js = require('xml2js'),
    fs = require('fs'),
    moment = require('moment');
generateISBNGroups = function(callback) {
    var isbn_groups = {};
    var parser = new xml2js.Parser();
    parseIsbnRanges = function(isbnObj){
        var groups = {}
        var registeredGroups = isbnObj.ISBNRangeMessage.RegistrationGroups[0];
        for(group in registeredGroups.Group)
        {
            if(registeredGroups.Group[group].Prefix[0].match(/^978/))
            {
                groups[registeredGroups.Group[group].Prefix[0].split("-")[1]] = {name:registeredGroups.Group[group].Agency[0], ranges:[]}
                var rules = registeredGroups.Group[group].Rules[0];
                for(rule in rules.Rule)
                {
                    var ranges = rules.Rule[rule].Range[0].split("-");
                    var len = parseInt(rules.Rule[rule].Length[0]);
                    groups[registeredGroups.Group[group].Prefix[0].split("-")[1]].ranges.push([ranges[0].substr(0, len),ranges[1].substr(0, len)]);
                }
            }
        }
        return groups;
    }
    var xmlData;
    request.get({url:"http://www.isbn-international.org/agency?rmxml=1"}, function(error, response, body)
    {
        xmlData = body;
    }).on('complete', function()
    {
        try {
            parser.parseString(xmlData, function(err, result)
            {
                if (err) {
                    console.log('An error occurred: ', err);
                } else {
                    isbn_groups.GROUPS = parseIsbnRanges(result);
                    isbn_groups.GROUPS_VERSION = moment(result.ISBNRangeMessage.MessageDate[0]).format('YYYYMMDD');
                    callback(null, isbn_groups);
                }
            });
        } catch (e) {
            console.log('encountered error', e);
        }
    });

}

saveISBNGroups = function() {
    generateISBNGroups(function(err, groups){
        fs.writeFile('../var/isbn-groups.json', JSON.stringify(groups), function (err) {
          if (err) throw err;
          console.log('isbn-groups.json saved');
        });
    });
}

module.exports.generateISBNGroups = function(cb) { generateISBNGroups(cb) };

saveISBNGroups();
