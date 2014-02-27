var ISBN = require('../index').global;

exports['testGlobal'] = function (test) {
    // Make sure Japan and 'English speaking areas' still work
    var isbn10a = ISBN.parse('4873113369');
    test.ok(isbn10a, "Can parse 4873113369");
    test.ok(isbn10a.isValid());
    test.equals('Japan', isbn10a.codes.groupname);
    var isbn10b = ISBN.parse('1933988037');
    test.ok(isbn10b, "Can parse 1933988037");
    test.ok(isbn10b.isValid());
    test.equals("English language", isbn10b.codes.groupname);
    var isbn13a = ISBN.parse('978-4-87311-336-4');
    test.ok(isbn13a, "Can parse 978-4-87311-336-4");
    test.ok(isbn13a.isValid());
    var isbn13b = ISBN.parse('9781590597279');
    test.ok(isbn13b, "Can parse 9781590597279");
    test.ok(isbn13b.isValid());

    // Non 'core' regions
    var german = ISBN.parse('3468011202');
    test.ok(german, "Can parse 3468011202");
    test.ok(german.isValid());
    test.equals("German language", german.codes.groupname);
    test.equals('9783468011207', german.asIsbn13());

    // International NGO's
    var ngo = ISBN.parse('978-92-9068-616-3');
    test.ok(ngo, "Can parse 978-92-9068-616-3");
    test.ok(ngo.isValid());
    test.equals('International NGO Publishers and EC Organizations', ngo.codes.groupname);
    test.equals('9290686162', ngo.asIsbn10());

    // We added this range
    var myilibrary = ISBN.parse('9786610632169');
    test.ok(myilibrary, "Can parse 9786610632169");
    test.ok(myilibrary.isValid());
    test.equals('MyiLibrary', myilibrary.codes.groupname);

    // Don't let the riff-raff in, still.
    test.equals(null, ISBN.parse('0-00-000-0'));
    test.equals(null, ISBN.parse('0-00000-0000-0'));
    test.equals(null, ISBN.parse('00000000000000000'));

    test.done();
};
