import { helper } from '@ember/component/helper';
import { capitalize as emberCapitalize } from '@ember/string';
/*added code that implements splitting apart several words on
whitespace and then capitalizing the first character of each word */

export function capitalize(input) {
  let words = input[0].split(/\s+/).map((word) => {
    return emberCapitalize(word.charAt(0)) + word.slice(1);
  });
  return words.join(' ');
}

export default helper(capitalize);
/* examples of some ember helpers
Category: Timestamps {{ago message.createdAt}} Output= 24 minutes ago
Category: Translation {{translate "butterfly"}} Output= papillon (French for butterfly)
Category: Localizations {{localize product.price}} Output= $4.99
Category: Text transformations {{shout "silence"}} Output=SILENCE!
*/
