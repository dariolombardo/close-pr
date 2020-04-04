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
  const pulls = await octokit.pulls.list({...context.repo, state: "open"}).data;

  console.log(`pulls number: ${pulls.length}`);

  for (i = 0; i < pulls.length; i++) {
    console.log(JSON.stringify(pulls[i], undefined, 2));
    console.log(`11111111111111111111111111111111111111`);
  }

  //console.log(`comment: ${comment}!`);
}

run().catch(err => {
  core.setFailed(err.message);
});
