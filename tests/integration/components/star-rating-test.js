import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | star-rating', function (hooks) {
  setupRenderingTest(hooks);

  test('Renders the full and empty stars correctly', async function (assert) {
    this.set('rating', 4);
    this.set('updateRating', () => {});
    await render(hbs` <StarRating
            @rating={{this.rating}}
            @onUpdate={{this.updateRating}}
          />
    `);
    assert
      .dom('[data-test-rr="full-star"]')
      .exists({ count: 4 }, 'The right amount of full stars is rendered');
    assert
      .dom('[data-test-rr="empty-star"]')
      .exists({ count: 1 }, 'The right amount of empty stars is rendered');

    this.set('rating', 2);
    assert
      .dom('[data-test-rr="full-star"]')
      .exists(
        { count: 2 },
        'The right amount of full stars is rendered after changing rating'
      );
    assert
      .dom('[data-test-rr="empty-star"]')
      .exists(
        { count: 3 },
        'The right amount of empty stars is rendered after changing rating'
      );
  });
  test('Calls onUpdate with the correct value', async function (assert) {
    this.set('rating', 2);
    this.set('updateRating', (rating) => {
      assert.step(`Updated to rating: ${rating}`);
    });

    await render(hbs`<StarRating
            @rating={{this.rating}}
            @onUpdate={{this.updateRating}}
          />`);
    await click('[data-test-rr="star-rating-button"]:nth-child(4)');
    assert.verifySteps(['Updated to rating: 4']);
  });
});

/* We just have to set properties on this. We first verify that the correct number of
full and empty stars are rendered initially and then change this.rating and check that
the number of full and empty stars changes accordingly.
*/

/*Another test is to check whether clicking one of the stars correctly calls the passed
in action with the appropriate rating */
/*We don't have to use the action decorator to bind the context of our event handler,
updateRating. As opposed to the "real" app, we run everything in the same context
(the context of the test), so there's no need to

assert.step and assert.verifySteps is a nifty tool in QUnit.

Every time assert.step is called, it records the argument it was called with.
We can then verify the order and equality of these arguments by calling assert.verifySteps
and passing the expected values. Here, we only use it for a single value
but it's especially useful when we want to check the order or calls.

So basically, If the star with a rating of 4 is clicked, we expect assert.step
to be called with Updated to rating: 4 so that's what our assertion verifies.
*/

/*One of the small details I like about Ember's testing story is that,
as long as there's a blueprint for it, you don't have to know which type of test to write
for a specific piece of your application:
you just tell which piece you write the test for. So was the case for components,
and so it is for services.`
*/
