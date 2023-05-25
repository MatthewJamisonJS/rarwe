import { click, fillIn } from '@ember/test-helpers';

export async function createBand(name) {
  await click('[data-test-rr="new-band-button"]');
  await fillIn('[data-test-rr="new-band-name"]', name);
  return click('[data-test-rr="save-band-button"]');
}
/* This process is taking the necessary steps in our tests  and expressing them
in the language of the application. Instead of saying "go here, click this, then fill
out that", we can just use the helper function "createBand"*/
