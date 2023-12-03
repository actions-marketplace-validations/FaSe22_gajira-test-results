const Jira = require('./common/net/Jira')
module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const issueId = this.argv.issue || this.config.issue || null
    let { comment } = this.argv

    console.log(`Adding comment to ${issueId}: \n${comment}`)
		comment = {
    "fields": {
      "customfield_10034": "--- Tested on\n* [x] Chrome\n* Safari\n* Firefox\n* Edge\n* [x] IE11\n--- Mobile\n* Android\n* iPhone"
    }
    await this.Jira.addComment(issueId, { body: comment })

    return {}
  }
}
