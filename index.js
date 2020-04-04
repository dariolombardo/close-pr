const core = require('@actions/core');
const github = require('@actions/github');

try {
  const context = github.context;
  const comment = core.getInput('comment');
  const token = process.env["GITHUB_TOKEN"] || "";
  
  if (token === "") {
    throw errors.noToken;
  }
  
  const octokit = new github.GitHub(token);

  const pulls = octokit.pulls.list({...context.repo, state: "open"});

  console.log(`pulls number: ${JSON.stringify(pulls, undefined, 2)}`);

  for (pull in pulls) {
    const payload = JSON.stringify(pull, undefined, 2);
    console.log(payload);
  }

  //console.log(`comment: ${comment}!`);
} catch (error) {
  core.setFailed(error.message);
}
