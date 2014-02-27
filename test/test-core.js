var ISBN = require('../isbn').ISBN;
var isbn10a = ISBN.parse('4873113369');
var isbn10b = ISBN.parse('1933988037');
var isbn13a = ISBN.parse('978-4-87311-336-4');
var isbn13b = ISBN.parse('9781590597279');

exports['testParse'] = function (test) {
    test.ok(isbn10a, "Can parse 4873113369");
    test.ok(isbn10a.isValid());
    test.ok(isbn10a.isIsbn10());
    test.ok(!isbn10a.isIsbn13());

    test.ok(isbn10b, "Can parse 1933988037");
    test.ok(isbn10b.isValid());
    test.ok(isbn10b.isIsbn10());
    test.ok(!isbn10b.isIsbn13());

    test.ok(isbn13a, "Can parse 978-4-87311-336-4");
    test.ok(isbn13a.isValid());
    test.ok(isbn13a.isIsbn13());
    test.ok(!isbn13a.isIsbn10());

    test.ok(isbn13b, "Can parse 9781590597279");
    test.ok(isbn13b.isValid());
    test.ok(isbn13b.isIsbn13());
    test.ok(!isbn13b.isIsbn10());

    test.equals(null, ISBN.parse('0-00-000-0'));
    test.equals(null, ISBN.parse('0-00000-0000-0'));
    test.equals(null, ISBN.parse('00000000000000000'));

    // Core only supports 'English speaking areas' and 'Japan'
    test.equals(null, ISBN.parse('3468011202'));

    test.done();
};

exports['testConversion'] = function (test) {
    test.equals('9784873113364', ISBN.asIsbn13('4-87311-336-9'));
    test.equals('4-87311-336-9', ISBN.asIsbn10('978-4-87311-336-4', true));
    test.equals(null, ISBN.asIsbn10('9790000000000'));
    test.equals('978-4-87311-336-4', ISBN.hyphenate('9784873113364'));

    test.equals('4873113369', isbn10a.asIsbn10());
    test.equals('4-87311-336-9', isbn10a.asIsbn10(true));
    test.equals('9784873113364', isbn10a.asIsbn13());
    test.equals('978-4-87311-336-4', isbn10a.asIsbn13(true));

    test.equals('1933988037', isbn10b.asIsbn10());
    test.equals('1-933988-03-7', isbn10b.asIsbn10(true));
    test.equals('9781933988030', isbn10b.asIsbn13());
    test.equals('978-1-933988-03-0', isbn10b.asIsbn13(true));

    test.equals('4873113369', isbn13a.asIsbn10());
    test.equals('4-87311-336-9', isbn13a.asIsbn10(true));
    test.equals('9784873113364', isbn13a.asIsbn13());
    test.equals('978-4-87311-336-4', isbn13a.asIsbn13(true));

    test.equals('1590597273', isbn13b.asIsbn10());
    test.equals('1-59059-727-3', isbn13b.asIsbn10(true));
    test.equals('9781590597279', isbn13b.asIsbn13());
    test.equals('978-1-59059-727-9', isbn13b.asIsbn13(true));

    test.done();
};

exports['testCodes'] = function (test) {
    test.equals('978-4-87311-336-4', isbn13a.codes.source);
    test.equals('978', isbn13a.codes.prefix);
    test.equals('4', isbn13a.codes.group);
    test.equals('87311', isbn13a.codes.publisher);
    test.equals('336', isbn13a.codes.article);
    test.equals('4', isbn13a.codes.check);
    test.equals('9', isbn13a.codes.check10);
    test.equals('4', isbn13a.codes.check13);
    test.equals('Japan', isbn13a.codes.groupname);

    test.equals('9781590597279', isbn13b.codes.source);
    test.equals('978', isbn13b.codes.prefix);
    test.equals('1', isbn13b.codes.group);
    test.equals('59059', isbn13b.codes.publisher);
    test.equals('727', isbn13b.codes.article);
    test.equals('9', isbn13b.codes.check);
    test.equals('3', isbn13b.codes.check10);
    test.equals('9', isbn13b.codes.check13);
    test.equals('English language', isbn13b.codes.groupname);

    test.done();

};
