import * as React from 'react';
import {cat} from 'shelljs';
import {readFileSync} from 'fs';

const tachyons = cat('./node_modules/tachyons/css/tachyons.min.css');

const courseName = 'Master application deployment and scaling with Kubernetes';

export function Layout({Content}: {Content: () => JSX.Element}) {
  return <html lang="en">
  <head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    <link rel="manifest" href="/manifest.json"/>
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#326ce5"/>
    <meta name="theme-color" content="#ffffff"/>
    <style dangerouslySetInnerHTML={{__html: tachyons}}></style>
    <style>{`
    .sky {
      position: relative;
      height: 100vh;
      background-color: #B9E5FB;
      background-image: url(/boat.svg), url(/wave.svg), url(/dock.svg), url(/clouds.svg);
      background-repeat: no-repeat, repeat-x, no-repeat, no-repeat;
      background-position: center bottom 0, center bottom 0, center bottom 0, right 15% top 0;
      background-size: 100%, 100%, 100%, 100%;
    }
    .hero {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -85%);
    }
    @media screen and (min-width: 60em) {
      .sky {
        background-size: auto 80vh, auto 80vh, auto 80vh, auto 80vh;
      }
    }
    @media screen and (min-width: 85em) {
      .f-subheadline-xl {
        font-size: 5rem;
      }
    }
    `}</style>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-485266-17"></script>
    <script dangerouslySetInnerHTML={{__html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-485266-17');
    `}}>
    </script>
    <title>Learnk8s</title>
  </head>
  <body className="bg-near-white sans-serif">
    <div className="sky cf">
      <div className="hero w-80">
        <a href="/" className="logo w-10 dib pv2 pb4-l" dangerouslySetInnerHTML={{__html: readFileSync('./src/logo.svg').toString('utf8')}}></a>
        <h1 className="f3 f1-l f-subheadline-xl dark-gray ma0 measure-narrow pb3-l">Master application<br />deployment and scaling<br />with Kubernetes</h1>
        <h2 className="f4 f3-l normal dark-gray">Online master class</h2>
      </div>
    </div>
    <section className="bg-near-white pl3 pr2 pt3 pb6 lh-copy measure-wide dark-gray center">
      <h2 className="f4 f3-ns pt4-ns pb3-ns normal">With the explosive momentum of Docker, Kubernetes has become the de-facto standard for orchestrating and managing containerised applications in production.</h2>
      <p>If you're just getting started with Docker and containers, <strong>now's the best time to become an expert</strong> with our <em>{courseName}</em> course.</p>
      <ul className="list ml3 pl1 pr2">
        <li className="mv2"><strong>What:</strong> Docker and Kubernetes Expertise, served Up Hot</li>
        <li className="mv2"><strong>Where:</strong> Online! Learn how to manage containers in your pyjamas</li>
        <li className="mv2"><strong>When:</strong>
          <ul>
            <li><a href="https://skillsmatter.com/courses/585-kubernetes-master-application-deployment-and-scaling-with-daniele-polencic" target="_blank" className="link dark-blue underline">27th-28th of November in London</a></li>
            <li><a href="https://ti.to/learnk8s/master-application-deployment-and-scaling-with-kubernetes" target="_blank" className="link dark-blue underline">29th-30th of November online</a></li>
          </ul>
        </li>
        <li className="mv2"><strong>Who:</strong> Daniele Polencic, the learnk8s team… and you</li>
      </ul>
      <p className="lh-copy"><strong>This course covers the basics of Docker</strong>. So it's like two courses in one!</p>
      <h3 className="f3">Do you need this course?</h3>
      <p>Good question.</p>
      <p>Do you…</p>
      <ul className="ml3 pl1 pr2">
        <li>Mount persistent storage (e.g. databases) in Docker without messing the permission with userid?</li>
        <li>Master the difference between CMD and ENTRYPOINT in Dockerfiles? Do you know when to use COPY or ADD? And PUBLISH and EXPOSE?</li>
        <li>Debug Docker containers while they are still running without SSH?</li>
        <li>Run Docker containers that expose multiple ports and require environment variables to function properly?</li>
        <li>Design architectures for micro services that can scale to thousands containers and gracefully handle increasing loads?</li>
        <li>Connect your Flask/SpringBoot/Node.js applications to a MySQL/MongoDB database using K8s service discovery?</li>
        <li>Expose your K8s services to the outside world using Ingresses?</li>
        <li>Expose multiple ports from the same Service?</li>
        <li>Inject arguments into running Pods from ConfigMaps?</li>
        <li>Reuse the same yaml files to deploy to different environments?</li>
        <li>Know all the ins and outs of when you should put your Java app, Rabbitmq and Redis containers into a single or separate pods?</li>
        <li>Reuse your docker-compose files to deploy to K8s without modifying your Docker images?</li>
        <li>Share files between two or more Pods with Volumes?</li>
        <li>Deploy your application without any downtime using rolling updates?</li>
      </ul>
      <p>Don't worry if you don't—<em>yet</em>. You will after you put yourself through our <em>{courseName}</em> course.</p>
      <h3 className="f3">What you'll learn</h3>
      <p>All of the above, of course. Plus…</p>
      <p>How to trigger deployments in Kubernetes on every commit and every time a Docker image is published.</p>
      <p>How to best leverage Helm to template, version and share your K8s resources with the rest of your team.</p>
      <p>How to plan for failover and live a happy life.</p>
      <p>How to take advantage of Minikube to test your deployments locally in a production-like environment.</p>
      <h3 className="f3">What you'll take home with you</h3>
      <p>You don't just get the course, you get goodies:</p>
      <ul className="ml3 pl1 pr2">
        <li><strong>Total Documentation</strong>: ready-to-print PDFs of all slides, perfect for taking notes during class (and reviewing, later on!)</li>
        <li><strong>Transcript of the chat room</strong> with tons of demo code, hints and questions answered</li>
        <li><strong>Rewatch as often as you like</strong>: you'll get a special URL to rewatch the class later!</li>
      </ul>
      <p>Not to mention a learning hangover. One of the good kinds.</p>
      <h3 className="f3">Q&amp;A sessions included</h3>
      <p>This course is highly interactive!</p>
      <p>You have at your disposal, for questions and assistance, Daniele Polencic, the author of the course.</p>
      <p className="pv4 tc"><a className="b f3 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue" href="https://ti.to/learnk8s/master-application-deployment-and-scaling-with-kubernetes">Register now!</a></p>
      <p>Do you have any question? Get in touch! <a href="mailto:hello@learnk8s.io" className="link dark-blue underline">hello@learnk8s.io</a></p>
    </section>
  </body>
</html>
}