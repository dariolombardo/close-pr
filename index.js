const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const comment = core.getInput('comment');

  console.log(`comment: ${comment}!`);
} catch (error) {
  core.setFailed(error.message);
}
