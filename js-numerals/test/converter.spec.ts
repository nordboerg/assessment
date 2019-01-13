import { Converter } from '../src/lib/converter';
import { DIGITS } from '../src/model/numerical-constants';

describe("Converter", function() {
    let converter: Converter;

    beforeEach(function() {
        converter = new Converter(DIGITS);
    });

    describe("convertToWords", function() {
        it("should convert the digits into words", function() {
            // arrange
            const data = [
                { value: '7', expected: 'seven' },
                { value: '42', expected: 'fourty-two' },
                { value: '2001', expected: 'two thousand and one' },
                { value: '1999', expected: 'nineteen hundred and ninety-nine' },
                { value: '17999', expected: 'seventeen thousand nine hundred and ninety-nine' },
                { value: '625', expected: 'six hundred and twenty-five'},
                { value: '16000005', expected: 'sixteen million and five' },
                { value: '36000', expected: 'thirty-six thousand' },
                { value: '4572023', expected: 'four million five hundred and seventy-two thousand and twenty-three' },
                { value: '0', expected: 'zero' }
            ];

            data.forEach((item) => {
                // act
                const words = converter.convertToWords(item.value);
                // assert
                expect(words).toEqual(item.expected);
            })
        });
    });

    describe("splitToSegments", function() {
        it("should split numbers into 3 character long segments", function() {
            // act
            const segments = converter.splitToSegments('16344002');
            // assert
            expect(segments.length).toEqual(3);
            expect(segments[0]).toEqual('16');
            expect(segments[1]).toEqual('344');
            expect(segments[2]).toEqual('002');
        });
    });

    describe("convertSegment", function() {
        it("should convert a single segment of a number", function() {
            // arrange
            const segments = converter.splitToSegments('16344002');
            // act
            const words = converter.convertSegment(Number(segments[1]));
            // assert
            expect(words).toEqual('three hundred and fourty-four');
        });

        it("should call getTriple if the segment is three digits long", function() {
            // arrange
            spyOn(converter, 'getTriple');
            const segments = converter.splitToSegments('634002');
            // act
            converter.convertSegment(Number(segments[0]));
            // assert
            expect(converter.getTriple).toHaveBeenCalled();
            expect(converter.getTriple).toHaveBeenCalledWith(634);
        });

        it("should call getDouble if the segment is less than three digits long", function() {
            // arrange
            spyOn(converter, 'getDouble');
            const segments = converter.splitToSegments('63002');
            // act
            converter.convertSegment(Number(segments[0]));
            // assert
            expect(converter.getDouble).toHaveBeenCalled();
            expect(converter.getDouble).toHaveBeenCalledWith(63);
        });
    });

    describe("getDouble", function() {
        it("should return the words for single and double digits", function() {
            // act
            const value1 = converter.getDouble(6);
            const value2 = converter.getDouble(50);
            const value3 = converter.getDouble(27);
            // assert
            expect(value1).toEqual('six');
            expect(value2).toEqual('fifty');
            expect(value3).toEqual('twenty-seven');
        });
    });

    describe("getTriple", function() {
        it("should return the words for triple digits", function() {
            // act
            const value1 = converter.getTriple(200);
            const value2 = converter.getTriple(453);
            // assert
            expect(value1).toEqual('two hundred');
            expect(value2).toEqual('four hundred and fifty-three');
        });
    });

    describe("addPostfix", function() {
        it("should join the appropriate postfix to each segment", function() {
            // arrange
            converter.offset = 1;
            // act
            const arr = converter.addPostfix(['two', 'eight hundred and thirty-one', 'and ninety']);
            // assert
            expect(arr).toEqual(['two million', 'eight hundred and thirty-one thousand', 'and ninety']);
        });

        it("should join the appropriate postfix to each segment", function() {
            // arrange
            converter.offset = 0;
            // act
            const arr = converter.addPostfix(['thirteen', 'and zero']);
            // assert
            expect(arr).toEqual(['thirteen hundred', 'and zero']);
        });
    });

    describe("formatResult", function() {
        it("should join the segments into a sentence", function() {
            // arrange
            converter.offset = 1;
            // act
            const result = converter.formatResult(['fourty-two', 'five hundred and eighty']);
            // assert
            expect(result).toEqual('fourty-two thousand five hundred and eighty');
        });

        it("should add a preceeding 'and' before the last segment if it's missing", function() {
            // arrange
            converter.offset = 1;
            // act
            const result = converter.formatResult(['four hundred and twenty', 'two']);
            // assert
            expect(result).toEqual('four hundred and twenty thousand and two');
        });
    });
});
