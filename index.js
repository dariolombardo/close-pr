const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const comment = core.getInput('comment');
  const octokit = new github.GitHub(token);

  console.log(octokit.pulls.list({
    ...context.repo,
    state: "open"
  }));

  console.log(`comment: ${comment}!`);
} catch (error) {
  core.setFailed(error.message);
}
