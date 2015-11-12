/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feed's definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined, non-empty URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have defined, non-empty names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */


        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when menu icon is clicked', function() {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous, so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //make sure loadFeed async call is done before running spec
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('container has at least one entry', function() {
            var allEntries = $('.entry');
            var numEntries = allEntries.length;
            expect(numEntries).toBeGreaterThan(0);
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        //keep track of each feed for later comparison
        var firstFeed;
        var nextFeed;

        //ensure that loading of comparison feeds is complete before running spec
        beforeEach(function(done) {
            //ensure that there exist at least two feeds for comparison
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

        it('results in content change', function() {
            expect(firstFeed).not.toEqual(nextFeed);
        });
    });
}());