/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against my application.
 */
/* All tests are placed within the $() function,
 * since some of these tests may require DOM elements,
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* "RSS Feeds" test suite - A test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in the application.
     */

    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have defined URLs', function() {
            allFeeds.forEach(function(feed) {
                var url = feed.url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have defined names', function() {
            allFeeds.forEach(function(feed) {
                var name = feed.name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            });
        });
    });

    /* "The menu" test suit */

    describe('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default. I'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        var body = $('body');
        it('is hidden', function() {
            expect(body.hasClass('menu-hidden')).toEqual(true);
        });

        describe('Toogle function', function() {

            /* This test ensures the menu changes
             * visibility when the menu icon is clicked. This test
             * should have two expectations: does the menu display when
             * clicked and does it hide when clicked again.
             */
            beforeEach(function() {
                $('.menu-icon-link').trigger('click');
            });

            it('could reveal the menu', function() {
                expect(body.hasClass('menu-hidden')).toEqual(false);
            });

            it('could hide the menu', function() {
                expect(body.hasClass('menu-hidden')).toEqual(true);
            });
        });
    });


    /* "Initial Entries" test suit*/

    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * LoadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has been added', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* "New Feed Selection" test suit*/

    describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * LoadFeed() is asynchronous.
         */
        var feed1, feed2;

        beforeEach(function(done) {
            loadFeed(1, function() {
                feed2 = $('.feed').find('h2').text();
                done();
            });
        });

        it('has changed the content', function(done) {
            loadFeed(0, function() {
                feed1 = $('feed').find('h2').text();
                expect(feed1).not.toEqual(feed2);
                done();
            });
        });
    });
}());
