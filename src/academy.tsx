import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Navbar, Footer, Layout, mailto, MailTo, FAQs, FAQ } from './layout.v2'
import { Course } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { renderToStaticMarkup } from 'react-dom/server'
import { material, assets as materialAssets } from './material'

export const Details = {
  type: 'academy',
  url: '/academy',
  seoTitle: 'In-depth, hands-on Kubernetes online courses ♦︎ Learnk8s Academy',
  title: 'In-depth, hands-on Kubernetes online courses',
  description: `Learn Kubernetes from the comfort of wherever you are with step-by-step tutorial and guided, hands-on material.`,
  openGraphImage: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
} as const

const enterprisePackage: MailTo = {
  subject: 'Learnk8s Academy — Enterprise license',
  body: `Hi Learnk8s,\n\nI'd like to discuss buying ___ licenses in bulk for the Learnk8s Academy.\n\nKind regards,\n`,
  email: 'hello@learnk8s.io',
}

const faqs: FAQ[] = [
  {
    title: `Can I see a preview of the videos?`,
    content: `This is not a video course. It is a learn-by-doing course. There's no shortcut in learning Kubernetes. You have to put the effort in and practice.`,
  },
  {
    title: `Kubernetes is a vast subject, what topics I won't find in this course?`,
    content: `You won't find:

- The Cilium CNI plugin, but you'll learn about the CNI and how to customise it
- How to set up CI/CD with Kubernetes
- Advanced allocations
- Securing your cluster
- Multi-cloud and multi-data centres deployments
- Architecture and networking

However, _we might be already working on including some of the above topics._`,
  },
  {
    title: 'Do you offer a student discount?',
    content: `Absolutely! Drops an email at [hello@learnk8s.io](mailto:hello@learnk8s.io) with some proof that you are a student and we'll send you a discount code. This applies to anyone in any schooling, including evening classes and coding bootcamps!`,
  },
  {
    title: `What if I'm not thrilled?`,
    content: `We want to make sure you get real value out of this, so we only want your money if you are happy with the product! If you aren't satisfied, within 30 days, send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io) with a copy of your receipt and, we will refund you.`,
  },
  {
    title: `What are the prerequisites to join the Learnk8s Academy?`,
    content: `You should be familiar with Bash/Powershell, git, grep, curl and SSH. You should be familiar with web servers such as Apache or Nginx. Also, it helps if you used Vagrant and Virtual Box, in the past, but it's only a nice-to-have.`,
  },
  {
    title: 'I have another question!',
    content: `Sure - send an email to [hello@learnk8s.io](mailto:hello@learnk8s.io).`,
  },
]

export function render(website: Sitemap, currentNode: LinkedNode<typeof Details>, siteUrl: string): string {
  return renderToStaticMarkup(
    <Layout
      website={website}
      seoTitle={currentNode.payload.seoTitle}
      title={currentNode.payload.title}
      description={currentNode.payload.description}
      openGraphImage={currentNode.payload.openGraphImage}
      absoluteUrl={getAbsoluteUrl(currentNode, siteUrl)}
    >
      <JsonLd<Course>
        item={{
          '@type': 'Course',
          '@context': 'https://schema.org',
          name: 'Architecting and scaling apps on Kubernetes',
          courseCode: 'K8SARCH',
          description: 'Self-paced Kubernetes online course: become an expert in deploying applications at scale.',
          educationalCredentialAwarded: 'CKAD (optional)',
          provider: {
            '@type': 'Organization',
            name: 'Learnk8s',
          },
        }}
      />

      <Navbar root={website} />

      <Section>
        <div className='mt4 pb4 pb5-l'>
          <div className='measure f3-l f4 center'>
            <h1 className='f1-l f2 navy'>
              Can you deploy and operate Kubernetes{' '}
              <span className='underline'>without shooting yourself in the foot</span>?
            </h1>
          </div>
          <p className='measure f3-l f4 lh-copy center i'>
            Are your cluster and apps following the best cloud-native practices?
          </p>
          <p className='measure f3-l f4 lh-copy center i'>Do they pass all security checks?</p>
          <p className='measure f3-l f4 lh-copy center i'>Are you confident debugging incidents in the prod cluster?</p>
          <p className='measure f3-l f4 lh-copy center bl bw3 b--blue ph3'>
            Learn <span className='b'>best practices and common pitfall</span> of deploying and scale apps in Kubernetes
            with the Learnk8s' hands-on, <span className='b'>online courses.</span>
          </p>
        </div>
      </Section>

      <Section className='bg-evian'>
        <div className='mt4 measure f3-l f4 center'>
          <h2 className='f1-l f2 navy'>
            Forget a simple health check, and it's game over — <span className='i'>already</span>
          </h2>
          <p className='measure f3-l f4 lh-copy center'>Your application can signal to Kubernetes when:</p>
          <ol>
            <li className='mv2 f3-l f4 lh-copy'>it is ready to receive traffic and</li>
            <li className='mv2 f3-l f4 lh-copy'>it crashed, and it should be restarted</li>
          </ol>
          <p className='measure f3-l f4 lh-copy center'>
            Those are commonly referred to as <span className='b underline navy'>readiness and liveness probes</span>.
          </p>
          <p className='measure f3-l f4 lh-copy center'>
            Forgetting a probe might not sound important, but it could{' '}
            <span className='b underline navy'>take down your production infrastructure</span> when you update your
            containers.
          </p>
          <p className='measure f3-l f4 lh-copy center'>
            Every time there's an upgrade, your apps without probes drop connections.
          </p>
          <p className='measure f3-l f4 lh-copy center i underline'>
            You won't believe how many engineers fail to address this.
          </p>
        </div>
      </Section>

      <Section>
        <div className='mt4 measure f3-l f4 center'>
          <h2 className='f1-l f2 navy'>
            It is easy to overcommit CPU and memory and <span className='underline'>crash your nodes</span>
          </h2>
          <p className='measure f3-l f4 lh-copy center'>
            The Kubernetes scheduler packs your containers into your servers like a Tetris player.
          </p>
          <p className='measure f3-l f4 lh-copy center'>
            Containers are the blocks; servers are the boards, and Kubernetes is the player.
          </p>
          <p className='measure f3-l f4 lh-copy center b underline'>But it doesn't work as you expect.</p>
          <p className='measure f3-l f4 lh-copy center'>
            If you don't specify memory and CPU limits for your apps, Kubernetes assumes that there are none.
          </p>
          <p className='measure f3-l f4 lh-copy center'>
            Yes, you read it right —{' '}
            <span className='b underline'>Kubernetes doesn't take into account the current server utilisation</span> in
            scheduling decisions.
          </p>
          <p className='measure f3-l f4 lh-copy center i'>How many apps could you fit on a server then?</p>
          <p className='measure f3-l f4 lh-copy center'>All the apps in the world, unfortunately.</p>
          <p className='measure f3-l f4 lh-copy center i underline'>
            You can easily crash your nodes because there's no memory left on the machine.
          </p>
        </div>
      </Section>

      <Section className='bg-evian'>
        <div className='mt4 measure f3-l f4 center'>
          <h2 className='f1-l f2 navy'>
            Kubernetes <span className='b underline'>secrets</span> are stored…{' '}
            <span className='i'>in plain text?!</span>
          </h2>
          <p className='measure f3-l f4 lh-copy center'>
            Yes, you're reading this right —{' '}
            <span className='b underline'>anyone who has access to the cluster can read the cluster secrets.</span>
          </p>
          <p className='measure f3-l f4 lh-copy center'>
            The secrets are not encrypted in the database either, so if you're taking regular backups
            <span className='i'>(hint: you should)</span>, those{' '}
            <span className='b underline'>backups have secrets in clear too.</span>
          </p>
          <p className='measure f3-l f4 lh-copy center i underline'>
            How can something so essential such as encryption be disabled by default?
          </p>
        </div>
      </Section>

      <Section>
        <div className='mt4 measure f3-l f4 center'>
          <h2 className='f1-l f2 navy'>
            You can easily <span className='underline'>double</span> your cloud bill even if you use fewer resources
          </h2>
          <p className='measure f3-l f4 lh-copy center'>
            In Kubernetes, there are several options when it comes to exposing your apps to the internet.
          </p>
          <p className='measure f3-l f4 lh-copy center'>
            If you opt for the wrong one,{' '}
            <span className='i'>
              you could end up creating a load balancer for each application deployed into the cluster.
            </span>
          </p>
          <p className='measure f3-l f4 lh-copy center b underline'>
            Load balancers are expensive, and you could rack up a hefty bill at the end of the month if you're not
            careful.
          </p>
          <p className='measure f3-l f4 lh-copy center'>
            The talented people behind Kubernetes developed a solution to fix this: the Ingress component.
          </p>
          <p className='measure f3-l f4 lh-copy center i underline'>
            However, the Ingress is often overlooked and forgot by beginner and seasoned engineers.
          </p>
        </div>
      </Section>

      <Section className='bg-evian'>
        <div className='mt4 measure f3-l f4 center'>
          <h2 className='f1-l f2 navy'>
            <span className='i'>Oh gosh,</span> what else you don't know about Kubernetes?
          </h2>
          <p className='measure f3-l f4 lh-copy center'>
            There are so many other ways that you could shoot yourself in the foot.
          </p>

          <ol className='pl0 list'>
            <li>
              <p className='pt3 f5-l f6 ttu lh-copy b'>Question:</p>
              <p className='measure f3-l f4 lh-copy center bl bw3 b--blue pl3'>
                Kubernetes has a component designed to autoscale Pods: the Horizontal Pod Autoscaler.{' '}
                <span className='b'>Does it work out of the box?</span>
              </p>
              <Quiz labelYes='Yes, of course' labelNo='No, it does not' correctAnswer='no' id='hpa'>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide b'>No, it does not.</span>
                </p>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide'>
                    If you submit and autoscaling requests, the request is ignored by the cluster.
                  </span>
                </p>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide'>
                    <span className='b'>You must install a custom metric server</span> to use the autoscaler in
                    Kubernetes.
                  </span>
                </p>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide i underline'>Why isn't the metrics server install by default?!</span>
                </p>
              </Quiz>
            </li>
            <li>
              <p className='pt3 f5-l f6 ttu lh-copy b'>Question:</p>
              <div className='bl bw3 b--blue pl3'>
                <p className='measure f3-l f4 lh-copy center'>
                  Containers are excellent to isolate applications —{' '}
                  <span className='i'>as good as virtual machines.</span>
                </p>
                <p className='measure f3-l f4 lh-copy center'>
                  As an example,{' '}
                  <span className='b underline'>
                    a container causing a kernel panic won't affect the other containers
                  </span>{' '}
                  on the same compute unit.
                </p>
                <p className='measure f3-l f4 lh-copy center b'>True or false?</p>
              </div>
              <Quiz labelYes='True' labelNo='Nope, isolation!' correctAnswer='yes' id='isolation'>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide b'>True.</span>
                </p>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide'>Containers are processes that share the same kernel.</span>
                </p>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide'>
                    If one causes a kernel panic, it will take down the entire host —{' '}
                    <span className='b underline'>as well as all the other processes.</span>
                  </span>
                </p>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide i underline'>
                    A container causing a kernel panic in Kubernetes will take down the entire node.
                  </span>
                </p>
              </Quiz>
            </li>
            <li>
              <p className='pt3 f5-l f6 ttu lh-copy b'>Question:</p>
              <div className='bl bw3 b--blue pl3'>
                <p className='measure f3-l f4 lh-copy center'>
                  In Kubernetes,{' '}
                  <span className='b underline'>any container can reach any other container on the network</span> even
                  if they are segregated in different namespaces.
                </p>
                <p className='measure f3-l f4 lh-copy center b'>True or false?</p>
              </div>
              <Quiz labelYes='True' labelNo={`No way, that's insecure`} correctAnswer='yes' id='network'>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide b'>True.</span>
                </p>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide'>
                    Unless you use Network policies in your cluster,{' '}
                    <span className='b underline'>any container can talk to any container.</span>
                  </span>
                </p>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide'>
                    This "feature" alone could cause quite a lot of{' '}
                    <span className='b underline'>compliance issues</span> in your company, particularly if you're
                    sharing the cluster with other teams.
                  </span>
                </p>
                <p className='measure f3-l f4 lh-copy center'>
                  <span className='hide i underline'>And what are Network policies anyway?!</span>
                </p>
              </Quiz>
            </li>
          </ol>
        </div>
      </Section>

      <Section>
        <div className='mt4 measure f3-l f4 center'>
          <h2 className='f1-l f2 navy'>You don't know what you don't know</h2>
          <p className='measure f3-l f4 lh-copy center i'>The list of Kubernetes pitfalls is longer than your arm.</p>
          <p className='measure f3-l f4 lh-copy center'>
            But once you know what they are, it's straightforward to come up with a solution or find the answer in
            another Stack Overflow question.
          </p>
          <p className='measure f3-l f4 lh-copy center b underline'>
            <span className='b underline'>If only Kubernetes was easy to learn</span> and the subject wasn't as vast.
          </p>
          <p className='measure f3-l f4 lh-copy center i'>How do you learn Kubernetes as quickly as possible?</p>
          <p className='measure f3-l f4 lh-copy center i'>
            How do you become so good to master single-handedly cluster operations, deployment, scaling, monitoring,
            logging and security in Kubernetes?
          </p>
          <p className='measure f3-l f4 lh-copy center i'>
            Is rolling your cluster and practising on the job the best way to go about this?
          </p>
          <p className='measure f3-l f4 lh-copy center'>
            <span className='b'>Yes, it is</span> — if you don't mind bringing down production every time you make a
            mistake.
          </p>
        </div>
      </Section>

      <Section className='bg-evian'>
        <div className='mt4 measure f3-l f4 center'>
          <h2 className='f1-l f2 navy'>What's the price for keeping production running like a well-oiled machine?</h2>
          <p className='measure f3-l f4 lh-copy center b'>Practice. Practice. Practice.</p>
          <p className='measure f3-l f4 lh-copy center'>
            When it comes to mastering a skill "10,000 hours is the magic number of greatness." —{' '}
            <span className='i'>suggests Malcolm Gladwell, an expert in the field of learning.</span>
          </p>
          <p className='measure f3-l f4 lh-copy center b'>
            But do you have 10,000 hours to spare to learn Kubernetes inside-out?
          </p>
          <p className='measure f3-l f4 lh-copy center'>That translates to 416 days, just over a year.</p>
          <p className='measure f3-l f4 lh-copy b underline'>That's a lot.</p>
          <p className='measure f3-l f4 lh-copy i'>
            Could you imagine taking a year off from work just to become an expert in Kubernetes?
          </p>
          <p className='measure f3-l f4 lh-copy'>
            And even if you're smarter and can complete the challenge in a fraction of the time, you're still talking
            about hundreds of hours spent in researching, studying and practising.
          </p>
          <p className='measure f3-l f4 lh-copy i'>How do we know?</p>
          <p className='measure f3-l f4 lh-copy b underline'>We've been there and done that.</p>
          <p className='measure f3-l f4 lh-copy'>It was painful and frustrating.</p>
          <p className='measure f3-l f4 lh-copy'>
            Tutorials are disconnected and scattered, and video courses touch only the basics.
          </p>
          <p className='measure f3-l f4 lh-copy'>
            But worse of all,{' '}
            <span className='b underline'>we wanted real, hands-on material where we could practice</span> locally and
            in the cloud.
          </p>
          <p className='measure f3-l f4 lh-copy'>
            That's why we put together <span className='b'>the course we wish we had when we learnt Kubernetes</span>.
          </p>
        </div>
      </Section>

      <Section>
        <div className='mt4 measure f3-l f4 center'>
          <h2 className='f1-l f2 navy'>A Kubernetes course built by engineers for engineers</h2>
          <p className='measure f3-l f4 lh-copy center'>
            The course, where you can learn how to design, develop and deploy applications in Kubernetes.
          </p>
          <p className='measure f3-l f4 lh-copy center'>A course that</p>
          <ul className='list ph2'>
            <ListItem>Prioritises hands-on material and challenges</ListItem>
            <ListItem>Covers practical, day-to-day scenario rather than abstract use cases</ListItem>
            <ListItem>
              Goes in-depth enough to be useful, but without becoming a boring list of flags that you can tweak
            </ListItem>
            <ListItem>Get you up to speed quickly</ListItem>
            <ListItem>Gives you the skills to be confident in deploying and managing production-grade apps</ListItem>
          </ul>
          <p className='measure f3-l f4 lh-copy center'>This course is not:</p>
          <ul className='list ph2'>
            <ListItemX>
              <span className='b'>A "watch the videos, and you become an expert" course.</span> There are no videos, and
              there are no experts in Kubernetes who learnt that way
            </ListItemX>
            <ListItemX>
              <span className='b'>Only about building clusters.</span> Clusters should be configured to support the apps
              deploying on it, not the other way around.
            </ListItemX>
          </ul>
        </div>
      </Section>

      <section className='bg-evian pv4'>
        <p className='f3 f2-l navy b tc'>What's inside</p>
        <ul className='flex-l flex-wrap-l pl0 mw7 center ph3'>
          <ListItem className='w-50-l'>Content-based, hands-on tutorials</ListItem>
          <ListItem className='w-50-l'>6 courses with ebooks</ListItem>
          <ListItem className='w-50-l'>
            Concise lectures with plenty of diagrams <span className='i'>(great if you are a visual learner)</span>
          </ListItem>
          <ListItem className='w-50-l'>Interactive challenges for beginners and experts</ListItem>
        </ul>

        <div className='mv3 mv5-l mt0-l mw8 center'>
          <Module
            preview={[materialAssets.docker.docker, materialAssets.docker.containersVMs]}
            title={`1. ${material.docker.name}`}
            description={material.docker.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn how to package and run applications in Docker containers. The module covers the following
              topics:
            </p>
            <ul>
              {Object.values(material.docker.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[
              materialAssets.kubernetesFundamentals.apiInfrastructure,
              materialAssets.kubernetesFundamentals.tetrisPlayer,
            ]}
            title={`2. ${material.kubernetesFundamentals.name}`}
            description={material.kubernetesFundamentals.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn the basics of Kubernetes and how to deploy Linux containers. The module covers the
              following topics:
            </p>
            <ul>
              {Object.values(material.kubernetesFundamentals.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[
              materialAssets.deploymentStrategies.livenessProbe,
              materialAssets.deploymentStrategies.rollingUpdates,
            ]}
            title={`3. ${material.deploymentStrategies.name}`}
            description={material.deploymentStrategies.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn different techniques to deploy your applications with zero downtime. The module covers the
              following topics:
            </p>
            <ul>
              {Object.values(material.deploymentStrategies.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[materialAssets.managingState.clusteredDatabase, materialAssets.managingState.distributedStorage]}
            title={`4. ${material.managingState.name}`}
            description={material.managingState.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn how to persist data in Kubernetes. The module covers the following topics:
            </p>
            <ul>
              {Object.values(material.managingState.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[materialAssets.templating.helmArchitecture, materialAssets.templating.reusableTemplates]}
            title={`5. ${material.templating.name}`}
            description={material.templating.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn how to template resources for different environments. The module covers the following
              topics:
            </p>
            <ul>
              {Object.values(material.templating.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>

          <Module
            preview={[materialAssets.autoscaling.intro, materialAssets.autoscaling.registry]}
            title={`6. ${material.autoscaling.name}`}
            description={material.autoscaling.description}
          >
            <p className='lh-copy measure-wide'>
              You will learn how to autoscale your applications based on CPU, memory and application-specific custom
              metrics. The module covers the following topics:
            </p>
            <ul>
              {Object.values(material.autoscaling.topics).map((it, index) => (
                <li key={index} className='lh-copy mv1'>
                  {it}
                </li>
              ))}
            </ul>
          </Module>
          <script dangerouslySetInnerHTML={{ __html: `(${CreateToggle.toString()})()` }} />
        </div>
      </section>

      <Section>
        <div className='mt4 measure f3-l f4 center'>
          <h2 className='f1-l f2 navy'>You will enjoy the courses, according to our students</h2>
          <p className='measure f3-l f4 lh-copy center'>Here is the feedback from our students.</p>
          <ul className='list pl0'>
            <li className='mv5'>
              <img src='assets/academy/testimonial1.png' alt='Testimonial' className='shadow-4' />
              <p className='f5 lh-copy bt pv2 ph4 bw1 b--light-gray bg-evian'>
                That's the response from Shawn when Daniele reached him out and offered to help on the material.
              </p>
            </li>
            <li className='mv5'>
              <img src='assets/academy/testimonial2.png' alt='Testimonial' className='shadow-4' />
              <p className='f5 lh-copy bt pv2 ph4 bw1 b--light-gray bg-evian'>
                We keep the Academy always up to date with the latest changes and Rudolf noticed that immediately.
              </p>
            </li>
            <li className='mv5'>
              <img src='assets/academy/testimonial3.png' alt='Testimonial' className='shadow-4' />
              <p className='f5 lh-copy bt pv2 ph4 bw1 b--light-gray bg-evian'>
                Karl was looking for an in-depth course to learn Kubernetes inside-out and kept us updated with his
                progress.
              </p>
              <div className='flex-l'>
                <div className='w-50-l'>
                  <img src='assets/academy/testimonial3b.png' alt='Testimonial' className='shadow-4' />
                </div>
                <div className='w-50-l'>
                  <img src='assets/academy/testimonial3c.png' alt='Testimonial' className='shadow-4' />
                </div>
              </div>
              <p className='f5 lh-copy bt pv2 ph4 bw1 b--light-gray bg-evian'>
                Karl was impressed by the quality of the content and enjoy practising with the hands-on labs and
                challenges.
              </p>
            </li>
            <li className='mv5'>
              <img src='assets/academy/testimonial4.png' alt='Testimonial' className='shadow-4' />
              <p className='f5 lh-copy bt pv2 ph4 bw1 b--light-gray bg-evian'>
                The Learnk8s Academy courses are excellent if you're a beginner and wish to get started with containers
                and Kubernetes.
              </p>
            </li>
          </ul>
        </div>
      </Section>

      <section className='pv4 bg-evian'>
        <p className='center f1-l f2 navy b tc ph3 measure-narrow'>Learn how to deploy at Google scale</p>
        <p className='lh-copy f4-l black-70 measure center tc ph3 mb5'>
          Join the Learnk8s Academy and learn how to deploy and manage applications with Kubernetes.
        </p>

        <section className='flex mw8 center more-content mb5'>
          <div className='left w-30 mw5'>
            <div className='pl3'>
              <div className='overflow-hidden'>
                <div className='w5'>
                  <div className='h2 mb3'>&nbsp;</div>
                  <div className='padding-hack-75'>&nbsp;</div>
                </div>
              </div>
              <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center b pl2'>Courses</p>
              <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center bg-white pl2 b'>Ebooks</p>
              <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center b pl2'>Online material</p>
              <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center bg-white pl2 b'>Online challenges</p>
              <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center b pl2'>Certificate of completion</p>
              <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center bg-white pl2 b'>Lifetime updates</p>
              <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center b pl2'>CKAD tips and tricks</p>
              <p className='f6 f5-l black-60 lh-copy h3 ma0 flex items-center bg-white pl2 b'>Discounted CKAD</p>
            </div>
          </div>
          <div className='right mw7 overflow-auto'>
            <div className='flex w7'>
              <div className='w5'>
                <div className='header h2 mb3'>
                  <h2 className='f3 tc navy mt0'>Professional</h2>
                </div>
                <div className='padding-hack-75'>
                  <img src='assets/academy/full-package.svg' alt='The full package' />
                </div>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center b'>6</p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white b'>20%</p>
                <div>
                  <p className='f3 navy tc mv4 bs'>
                    <span className='db' id='architecting-full'>
                      {(597).toLocaleString('US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </p>
                  <div className='tc'>
                    <a
                      href='https://academy.learnk8s.io/architecting-full'
                      className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2'
                      target='_self'
                      ref='noreferrer'
                    >
                      Buy now →
                    </a>
                  </div>
                </div>
              </div>

              <div className='w5'>
                <div className='header h2 mb3'>
                  <h2 className='f3 tc navy mt0'>Expert</h2>
                </div>
                <div className='padding-hack-75'>
                  <img src='assets/academy/expert-package.svg' alt='The expert package' />
                </div>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center b'>6</p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>&nbsp;</p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white b'>&nbsp;</p>
                <div>
                  <p className='f3 navy tc mv4 bs'>
                    <span className='db' id='architecting-expert'>
                      {(397).toLocaleString('US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </p>
                  <div className='tc'>
                    <a
                      href='https://academy.learnk8s.io/architecting-expert'
                      className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2'
                      target='_self'
                      ref='noreferrer'
                    >
                      Buy now →
                    </a>
                  </div>
                </div>
              </div>

              <div className='w5'>
                <div className='header h2 mb3'>
                  <h2 className='f3 tc navy mt0'>Beginner</h2>
                </div>
                <div className='padding-hack-75'>
                  <img src='assets/academy/ebooks-bundle.png' alt='The eBooks bundle' />
                </div>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center b'>4</p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>
                  <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
                </p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>&nbsp;</p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>&nbsp;</p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>&nbsp;</p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white'>&nbsp;</p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center'>&nbsp;</p>
                <p className='black-80 lh-copy h3 ma0 flex items-center justify-center bg-white b'>&nbsp;</p>
                <div>
                  <p className='f3 navy tc mv4 bs'>
                    <span className='db' id='architecting-bundle'>
                      {(121).toLocaleString('US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </p>
                  <div className='tc'>
                    <a
                      href='https://academy.learnk8s.io/architecting-bundle'
                      className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2'
                      target='_self'
                      ref='noreferrer'
                    >
                      Buy now →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='tc pv4'>
          <a href={mailto(enterprisePackage)} className='f7 black-70 no-underline'>
            Learnk8s offers competitive corporate prices. <span className='underline'>Get in touch to learn more.</span>
          </a>
        </div>
      </section>

      <Section>
        <div className='mt4 measure f3-l f4 center'>
          <h2 className='f1-l f2 navy'>
            The first module is on us —{' '}
            <span className='underline'>
              it's <span className='ttu'>free</span>
            </span>
          </h2>
          <p className='measure f3-l f4 lh-copy center i underline'>
            Do you want and find out what if the course is worth your time?
          </p>
          <p className='measure f3-l f4 lh-copy center'>
            The first course of the Learnk8s Academy takes you from coding a local app to deploying it in Kubernetes{' '}
            <span className='i'>locally and then in the cloud.</span>
          </p>
          <p className='measure f3-l f4 lh-copy center b underline'>
            It's <span className='ttu'>free</span> for you to try, just request an invite below:
          </p>
          <form action='https://academy.learnk8s.io/access' method='POST' className='bg-evian ph4 pt1 pb4'>
            <ol className='list pl0'>
              <li className='mv4'>
                <label htmlFor='email' className='f5 db tl ttu pb2 fw6 navy'>
                  Your email address
                </label>
                <input
                  className='f4 pa3 w-60-l w-100 br3 input-reset ba b--silver bw1'
                  type='email'
                  required={true}
                  name='email'
                  id='email'
                  placeholder='Your email address'
                />
              </li>
              <p className='measure f3-l f4 lh-copy center'>
                We customise the content based on your preferences.
                <br />
                <span className='i underline'>What apps do you plan to deploy in Kubernetes?</span>
              </p>
              <li className='mv4'>
                <label htmlFor='java' className='db mv2'>
                  <input
                    type='checkbox'
                    className='checkbox input-reset h2 w2 ba bw1 b--silver v-mid br2 mr3 bg-white'
                    name='language'
                    id='java'
                    value='java'
                  />
                  <span className='f3-l f4 lh-copy black-80'>Java</span>
                </label>
                <label htmlFor='nodejs' className='db mv2'>
                  <input
                    type='checkbox'
                    className='checkbox input-reset h2 w2 ba bw1 b--silver v-mid br2 mr3 bg-white'
                    name='language'
                    id='nodejs'
                    value='nodejs'
                  />
                  <span className='f3-l f4 lh-copy black-80'>Node.js / Javascript</span>
                </label>
                <label htmlFor='python' className='db mv2'>
                  <input
                    type='checkbox'
                    className='checkbox input-reset h2 w2 ba bw1 b--silver v-mid br2 mr3 bg-white'
                    name='language'
                    id='python'
                    value='python'
                  />
                  <span className='f3-l f4 lh-copy black-80'>Python</span>
                </label>
                <label htmlFor='csharp' className='db mv2'>
                  <input
                    type='checkbox'
                    className='checkbox input-reset h2 w2 ba bw1 b--silver v-mid br2 mr3 bg-white'
                    name='language'
                    id='csharp'
                    value='csharp'
                  />
                  <span className='f3-l f4 lh-copy black-80'>C# / .NET</span>
                </label>
                <label htmlFor='other' className='db mv2'>
                  <input
                    type='checkbox'
                    className='checkbox input-reset h2 w2 ba bw1 b--silver v-mid br2 mr3 bg-white'
                    name='language'
                    id='other'
                    value='other'
                  />
                  <span className='f3-l f4 lh-copy black-60'>Other:</span>
                  <input type='text' name='other' className='ml3 f4 pa2 br3 input-reset ba b--silver' />
                </label>
              </li>
            </ol>
            <button className='no-underline dib white bg-blue br1 pv3 ph4 b f4 br2 mv2' type='submit'>
              Get access ⇢
            </button>
            <p className='success absolute bottom mt1 w-100 bg-light-green pa2 dark-green b--dark-green bw1 b--solid dn'>
              Thank you for subscribing!
            </p>
            <p className='failure absolute bottom mt1 w-100 bg-light-red pa2 black b--dark-red bw1 b--solid dn'>
              Invalid email.
            </p>
          </form>
        </div>
      </Section>

      <Section className='bg-evian'>
        <div className='f3 measure center tc'>
          <h2 className='f1-l f2 navy navy'>The Learnk8s Academy Guarantee: Our promise to you</h2>
        </div>
        <div className='mw7 center'>
          <p className='lh-copy f3-l f4 black-70 b mb1 mt5-l mt4'>
            We care more about our students' success than taking their money.
          </p>
          <p className='lh-copy f3-l f4 black-70 mt1'>
            If you follow the lectures and practise the material and still DO NOT feel like you are making progress 30
            days after you begin doing the work, we will try to work with you to identify what's missing. And if that
            doesn't work, we'll give you a full refund.
          </p>
          <p className='lh-copy f3-l f4 black-70 b mb1 mt5-l mt4'>
            We're honest to the end about the level of effort, skills, and other ingredients required.
          </p>
          <p className='lh-copy f3-l f4 black-70 mt1'>
            This is not a <span className='i'>watch someone else deploying containers in Kubernetes</span> video course.
            Completing the Learnk8s Academy's modules takes time and effort…{' '}
            <span className='b'>but it does work.</span> The learning curve is steep; then, the plateau of usefulness is
            very long and smooth. It's a great feeling operating Kubernetes after you've mastered it.
          </p>
        </div>
      </Section>

      <FAQs faqs={faqs} />

      <Footer root={website} />
    </Layout>,
  )
}

export const Item: React.StatelessComponent<{ tick: JSX.Element }> = ({ children, tick }) => {
  return (
    <li className='mv3 flex justify-center'>
      <div className='v-top tc'>
        <img src={tick.props.src} alt={tick.props.alt} className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>{children}</div>
    </li>
  )
}

const Module: React.StatelessComponent<{
  title: string
  description: string
  preview: JSX.Element[]
  className?: string
}> = ({ children, title, description, preview, className }) => {
  const id = title.toLowerCase().replace(/[^\w]+/g, '-')
  return (
    <div className={`mh3 ${className}`}>
      <div className='module pt3 pb4 ph4 shadow-2 mv4 bg-white flex items-start'>
        <div className='w-50-ns'>
          <p className='f3 navy b bb b--black-20 pb3'>{title}</p>
          <div className=''>
            <p className='f5 lh-copy measure-wide'>{description}</p>
            <div className={`controls controls-${id}`}>
              <button
                className='open dib ba b--sky sky pv2 ph3 b f5 br2 hover-bg-evian pointer bg-white'
                data-toggle={`.details-${id},.controls-${id}`}
                data-toggle-collapsed
              >
                View details
              </button>
              <button
                className='close dib ba b--light-gray gray pv2 ph3 b f5 br2 ml2 bg-light-gray hover-bg-moon-gray hover-dark-gray pointer'
                data-toggle={`.details-${id},.controls-${id}`}
              >
                Hide details
              </button>
            </div>
            <div className={`details details-${id}`}>{children}</div>
          </div>
        </div>
        <div className='w-50 flex-ns flex-wrap items-start pt3 dn'>
          {preview.map(it => {
            return (
              <div className='w-80 w-50-l center'>
                <div className='padding-hack-75 relative'>
                  <img src={it.props.src} alt={it.props.alt} className='absolute top-0 right-0' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const Feedback: React.StatelessComponent<{
  description: string
  author: string
  role?: string
  className?: string
}> = ({ description, author, role, className }) => {
  return (
    <div className={`bg-evian ph4 pv3 ${className}`}>
      <p className='f5 lh-copy black-80'>{description}</p>
      <p className='f5 lh-copy black-80 b'>
        — {author}
        {role ? `, ${role}` : ''}
      </p>
    </div>
  )
}

export const ListItemQuestion: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <li className='mv3 flex justify-center'>
      <div className='v-top tc'>
        <img src='assets/question.svg' alt='Question' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f4-l lh-copy black-70'>{children}</p>
      </div>
    </li>
  )
}

const ListItem: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <li className={`mv2 flex justify-center ${className || ''}`}>
      <div className='v-top tc'>
        <img src='assets/tick.svg' alt='Tick' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f3-l f4 lh-copy black-80'>{children}</p>
      </div>
    </li>
  )
}

const ListItemX: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <li className={`mv2 flex justify-center ${className || ''}`}>
      <div className='v-top tc'>
        <img src='assets/x.svg' alt='Tick' className='w2 h2' />
      </div>
      <div className='v-top pl3 w-90'>
        <p className='mv0 f3-l f4 lh-copy black-80'>{children}</p>
      </div>
    </li>
  )
}

const Quiz: React.StatelessComponent<{
  className?: string
  correctAnswer: 'yes' | 'no'
  id: string
  labelYes: string
  labelNo: string
}> = ({ id, children, className, correctAnswer, labelYes, labelNo }) => {
  return (
    <div className={`yesno ${correctAnswer === 'yes' ? 'first-right' : 'second-right'} ${className || ''}`}>
      <input type='radio' name={id} id={`yes-${id}`} className='dn yes' />
      <input type='radio' name={id} id={`no-${id}`} className='dn no' />
      <ol className='ph5-l ph2 list'>
        <li className='yes mv2 pa2 br2'>
          <label htmlFor={`yes-${id}`} className='h2 flex items-center'>
            <span className='radio ba w2 h2 br-100 bw1 v-mid dib' />
            <span className='pl3 f3-l f4'>{labelYes}</span>
          </label>
        </li>
        <li className='no mv2 pa2 br2'>
          <label htmlFor={`no-${id}`} className='h2 flex items-center'>
            <span className='radio ba w2 h2 br-100 bw1 v-mid dib' />

            <span className='pl3 f3-l f4'>{labelNo}</span>
          </label>
        </li>
      </ol>
      <p className='pt3 f5-l f6 ttu lh-copy b'>Answer:</p>
      <div className='answer'>{children}</div>
    </div>
  )
}

const Section: React.StatelessComponent<{ className?: string }> = ({ children, className }) => {
  return <section className={`pv4 black-80 ph3 ${className || ''}`}>{children}</section>
}

function CreateToggle() {
  function doesntExist<T>(it: T): boolean {
    return !it
  }
  function Toggle(element: Element) {
    var target = element.getAttribute('data-toggle')
    if (!target) {
      return
    }
    var targetElements = target.split(',').map(function(selector) {
      return document.querySelector(selector)
    })
    if (targetElements.some(doesntExist)) {
      return
    }
    if (targetElements[0]!.classList.contains('toggle-collapse')) {
      targetElements.forEach(function(it) {
        return it!.classList.remove('toggle-collapse')
      })
    } else {
      targetElements.forEach(function(it) {
        return it!.classList.add('toggle-collapse')
      })
    }
  }

  ;[].slice.call(document.querySelectorAll('[data-toggle]')).forEach(function(element: Element) {
    element.addEventListener('click', function() {
      Toggle(element)
    })
  })
  ;[].slice.call(document.querySelectorAll('[data-toggle-collapsed]')).forEach(Toggle)
}
