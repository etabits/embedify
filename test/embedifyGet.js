"use strict";

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const embedify = require('../main');

const InvalidArgumentError = embedify.InvalidArgumentError;
const ApiRequestError = embedify.ApiRequestError;
const UrlMatchError = embedify.UrlMatchError;

const expect = chai.expect;
const should = chai.should;
chai.use(chaiAsPromised);

describe('Embedify Get', function() {

    it('should return result if matchUrls is valid string', function () {

        const matchUrls = "https://www.youtube.com/embed/iOf7CsxmFCs";
        return expect(embedify.get(matchUrls))
            .to.eventually.be.fulfilled
            .then(function (result) {
                return expect(result[0].type).to.equal("video");
            });
    });

    it('should return result if matchUrls is valid array', function () {

        const matchUrls = [
            "https://www.youtube.com/embed/iOf7CsxmFCs",
            "https://www.youtube.com/watch?v=nfWlot6h_JM"
        ];

        const expectedResult = [
            {
                type: 'video',
                thumbnail_height: 360,
                thumbnail_url: 'https://i.ytimg.com/vi/iOf7CsxmFCs/hqdefault.jpg',
                provider_url: 'https://www.youtube.com/',
                provider_name: 'YouTube',
                width: 480,
                thumbnail_width: 480,
                title: '☼ Min sommer road trip | Del 1 ☼',
                author_url: 'https://www.youtube.com/user/AmandaS4G',
                version: '1.0',
                author_name: 'Amanda MIDK',
                height: 270,
                html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/iOf7CsxmFCs?feature=oembed" frameborder="0" allowfullscreen></iframe>'
            },
            {
                author_name: "TaylorSwiftVEVO",
                author_url: "https://www.youtube.com/user/TaylorSwiftVEVO",
                height: 270,
                html: "<iframe width=\"480\" height=\"270\" src=\"https://www.youtube.com/embed/nfWlot6h_JM?feature=oembed\" frameborder=\"0\" allowfullscreen></iframe>",
                provider_name: "YouTube",
                provider_url: "https://www.youtube.com/",
                thumbnail_height: 360,
                thumbnail_url: "https://i.ytimg.com/vi/nfWlot6h_JM/hqdefault.jpg",
                thumbnail_width: 480,
                title: "Taylor Swift - Shake It Off",
                type: "video",
                version: "1.0",
                width: 480
            }];

        return expect(embedify.get(matchUrls))
            .to.eventually.be.fulfilled
            .then(function(result) {
                return expect(result).to.deep.equal(expectedResult);
            });
    });
});

describe('Embedify Get Errors', function() {

    it('should return InvalidArgumentError if embedUrl is null', function () {

        const embedUrl = null;
        return expect(embedify.get(embedUrl)).to.be.rejectedWith(InvalidArgumentError);
    });

    it('should return InvalidArgumentError if embedUrl is undefined', function () {

        const embedUrl = undefined;
        return expect(embedify.get(embedUrl)).to.be.rejectedWith(InvalidArgumentError);
    });

    it('should return InvalidArgumentError if embedUrl is number', function () {

        const embedUrl = 123;
        return expect(embedify.get(embedUrl)).to.be.rejectedWith(InvalidArgumentError);
    });

    it('should return InvalidArgumentError if embedUrl is object', function () {

        const embedUrl = {};
        return expect(embedify.get(embedUrl)).to.be.rejectedWith(InvalidArgumentError);
    });

    it('should return InvalidArgumentError if embedUrl is non-string array', function () {

        const embedUrl = [123, {}];
        return expect(embedify.get(embedUrl)).to.be.rejectedWith(InvalidArgumentError);
    });
});