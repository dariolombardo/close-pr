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
  const data = pulls.data;

  console.log(`pulls number: ${data.length}`);

  console.log(`11111111111111111111111111111111111111`);
  console.log(JSON.stringify(data, undefined, 2));
  console.log(`222222222222222222222222222222222222222222`);

  for (pull in data) {
    const payload = ;
    console.log(JSON.stringify(pull, undefined, 2));
  }

  //console.log(`comment: ${comment}!`);
}

run().catch(err => {
  core.setFailed(err.message);
});
