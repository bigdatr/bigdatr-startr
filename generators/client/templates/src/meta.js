window.app = {
    meta: {
        env: process.env,
        build: {
            sha: buildInfo.sha,
            branch: buildInfo.branch,
            buildNumber: buildInfo.buildNumber,
            previousBuildNumber: buildInfo.previousBuildNumber
        }
    }
};
