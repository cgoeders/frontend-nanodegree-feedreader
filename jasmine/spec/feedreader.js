/* feedreader.js

This is the spec file that Jasmine will read. It contains
all tests to be run against the application.
 
Note: All tests are placed within the $() function since some of these 
tests may require DOM elements. We want to ensure they don't run 
until the DOM is ready.

 */

$(function() {

    //test suite addressing RSS feed definitions
    describe('RSS Feeds', function() {
        
        //check that `allFeeds` variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //check that each feed in `allFeeds` has a defined, non-empty URL
        it('have defined, non-empty URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        //check that each feed in `allFeeds` has a defined, non-empty name
        it('have defined, non-empty names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    //test suite addressing menu-hiding functionality
    describe('The menu', function() {

        //declare variables for reference in specs
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        //check that menu is hidden by default
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        //check that menu changes visibility upon menu icon click
        it('changes visibility when menu icon is clicked', function() {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });


    //test suite addressing initial entries after `loadFeed` finishes running
    describe('Initial Entries', function() {

        //make sure `loadFeed` async call is done before running spec
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //check that there exists at least one '.entry' element in '.feed' container
        it('container has at least one entry', function() {
            var allEntries = $('.entry');
            var numEntries = allEntries.length;
            expect(numEntries).toBeGreaterThan(0);
        });
    });


    //test suite addressing new feed selection and content changes
    describe('New Feed Selection', function() {

        //keep track of each feed for later comparison
        var firstFeed;
        var nextFeed;

        //check that loading of comparison feeds is complete before running spec
        beforeEach(function(done) {
            //check that there exist at least two feeds for comparison
            expect(allFeeds.length).toBeGreaterThan(1);

            //load first feed at index 0
            loadFeed(0, function() {
                //set `firstFeed` equal to header title and feed's html
                firstFeed = $('.header-title').text() + $('.feed').html();

                //load next feed at index 1
                loadFeed(1, function() {
                    //set `nextFeed` equal to header title and feed's html
                    nextFeed = $('.header-title').text() + $('.feed').html();
                    done();
                });
            });
        });

        //reset feed to that at index 0
        afterEach(function() {
            loadFeed(0);
        });

        //check that content of newly selected feed differs from that of previous feed
        it('results in content change', function() {
            expect(firstFeed).not.toEqual(nextFeed);
        });
    });
}());