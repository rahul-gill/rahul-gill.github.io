import React from "react";

const projects = [
  {
    category: "Project",
    title: "nodejs-mysql-cloudformation",
    slug: "#nodejs-mysql-cloudformation",
    subtitle:
      "Sample subtitle text is here.",
    period: "November 2020",
    tech: "GitHub Action, Kotlin, Android",
    description: (
      <>
        <p>
          An example of how you can add a project her in this site. Blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah
        </p>
        <p>
          This example deploys the NodeJS-ExpressJS-MySQL
          Create-Read-Update-Delete (CRUD) application at{" "}
          <a href="https://github.com/DigiPie/nodejs-mysql-aws-beanstalk">
            DigiPie/nodejs-mysql-aws-beanstalk
          </a>
          , by using the CloudFormation IaC templates in this repository and
          setting up a simple AWS CodePipeline.
        </p>
        <p>
          I worked on this project to learn more about the{" "}
          <a href="https://www.hashicorp.com/resources/getting-started-with-infrastructure-as-code-iac">
            Infrastructure-as-Code
          </a>{" "}
          concept and{" "}
          <a href="https://aws.amazon.com/cloudformation/">
            AWS CloudFormation
          </a>
          .
        </p>
      </>
    ),
    links: [
      {
        name: "GitHub",
        link: "https://github.com/DigiPie/nodejs-mysql-cloudformation",
      },
    ],
  },
];

export default projects;
