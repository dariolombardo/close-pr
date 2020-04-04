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

  console.log(`CONTEXT >>${JSON.stringify(context, undefined, 2)}<<<<`);
  
  for (i = 0; i < pulls.data.length; i++) {
    /*if (body.length > 0) {
      core.info("Creating a comment");
      await client.issues.createComment({
        ...context.repo,
        issue_number: context.issue.number,
        body
      });
    }*/
    id = pulls.data[i].id
    core.info("Closing PR ${id}");
    await client.pulls.update({...context.repo, pull_number: id, state: "closed"});
  }
}

run().catch(err => {
  core.setFailed(err.message);
});
