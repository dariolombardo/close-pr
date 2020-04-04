const core = require('@actions/core');
const github = require('@actions/github');

const run = async () => {
  const context = github.context;
  const comment = core.getInput('comment');
  const token = process.env["GITHUB_TOKEN"] || "";
  
  if (token === "") {
    throw errors.noToken;
  }
  
  const octokit = new github.GitHub(token);

  const pulls = await octokit.pulls.list({...context.repo, state: "open"});

  console.log(`pulls number: ${pulls.data.length}`);

  for (pull in pulls.data) {
    const payload = JSON.stringify(pull, undefined, 2);
    console.log(payload);
  }

  //console.log(`comment: ${comment}!`);
}

run().catch(err => {
  core.setFailed(err.message);
});
