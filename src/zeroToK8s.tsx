import React from 'react'
import { LinkedNode, Sitemap, getAbsoluteUrl } from './sitemap'
import { Layout, ListItem, FAQ, InlineMarkdown } from './layout.v2'
import { Course, Boolean } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import { renderToStaticMarkup } from 'react-dom/server'
import { ListItemQuestion, Feedback } from './academy'

export const Details = {
  type: 'zero-to-k8s',
  url: '/start-kubernetes-nodejs',
  seoTitle: 'The modern course on deploying Node.js, Express and MongoDB with Docker and Kubernetes',
  title: 'The modern course on deploying Node.js, Express and MongoDB with Docker and Kubernetes',
  description: `Zero to Kubernetes is a step-by-step course on how to design, develop and deploy Node.js applications on Kubernetes.`,
  openGraphImage: <img src='assets/open_graph_preview.png' alt='Learnk8s preview' />,
} as const

const faqs: FAQ[] = [
  {
    title: `Is it really free?`,
    content: `Yes, you can log in into the Learnk8s and start learning.`,
  },
  {
    title: `Kubernetes is a vast subject, what does this course cover?`,
    content: `This course is designed to get you up to speed with container and Kubernetes. It doesn't cover advanced topics such as networking, deployment strategies or templating resources.`,
  },
  {
    title: `What are the prerequisites to join the course?`,
    content: `You should be familiar with Bash/Powershell, git, curl and SSH. You should be familiar with web servers such as Apache or Nginx.`,
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
          name: 'Learnk8s Academy',
          courseCode: 'K8SACADEMY-02K8SJS',
          description:
            'Zero to Kubernetes is a step-by-step course on how to design, develop and deploy Node.js applications on Kubernetes.',
          educationalCredentialAwarded: 'Certificate of completion from Learnk8s',
          provider: {
            '@type': 'Organization',
            name: 'Learnk8s',
          },
          isAccessibleForFree: Boolean.True,
        }}
      />
      <div className='center mw7 ph3'>
        <h1 className='f1 lh-solid navy pt4'>
          The modern course on deploying Node.js, Express and MongoDB with Docker and Kubernetes
        </h1>
        <p className='lh-copy f4-l black-70'>The traditional way of deploying Node.js apps:</p>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .numbered {
            counter-reset: my-awesome-counter;
          }
          .numbered li {
            counter-increment: my-awesome-counter;
          }
          .numbered li::before {
            content: counter(my-awesome-counter);
            background: #662974;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: inline-block;
            line-height: 2rem;
            color: white;
            text-align: center;
            margin-right: 0.5rem;
            font-weight: bold;
            float: left;
          }
          .feedback {
            column-count: 1;
          }
          @media screen and (min-width: 30em) and (max-width:60em) {
            .feedback {
              column-count: 2;
            }
          }
          @media screen and (min-width: 60em) {
            .feedback {
              column-count: 3;
            }
          }`,
          }}
        />
        <ul className='list numbered black-70 pl0 pt2'>
          <li className='f4-l lh-copy mv3 cf'>
            <p className='pl4 ml2 b lh-copy measure mb1 mt0'>
              You create a VPS and install Node.js, MongoDB and Nginx.
            </p>
            <p className='pl4 ml2 lh-copy measure mt0'>
              If you need a test and production environment, you should be careful to repeat the same steps without any
              deviation.
            </p>
          </li>
          <li className='f4-l lh-copy mv3 cf'>
            <p className='pl4 ml2 b lh-copy measure mb1 mt0'>
              You upload the code with SFTP (or SCP) to the server paying attention to the node_modules folder.
            </p>
            <p className='pl4 ml2 lh-copy measure mt0'>
              You shouldn't copy packages that are compiled for your mac to a Linux server (I'm looking at you
              node-sass).
            </p>
          </li>
          <li className='f4-l lh-copy mv3 cf'>
            <p className='pl4 ml2 b lh-copy measure mb1 mt0'>
              You should run npm install before every deployment, in case a new package was installed or removed.
            </p>
            <p className='pl4 ml2 lh-copy measure mt0'>You should probably automate that too.</p>
          </li>
          <li className='f4-l lh-copy mv3 cf'>
            <p className='pl4 ml2 b lh-copy measure mb1 mt0'>When the app crashes, you should restart it.</p>
            <p className='pl4 ml2 lh-copy measure mt0'>
              Setting up PM2 or forever is a must to keep the app always running.
            </p>
          </li>
          <li className='f4-l lh-copy mv3 cf'>
            <p className='pl4 ml2 b lh-copy measure mb1 mt0'>
              If you run a collection of apps, you have no choice but having a reverse proxy such as Nginx to route the
              traffic.
            </p>
            <p className='pl4 ml2 lh-copy measure mt0'>
              But even if you run a single application, you should consider using one for TLS and serving static assets.
            </p>
          </li>
          <li className='f4-l lh-copy mv3 cf'>
            <p className='pl4 ml2 b lh-copy measure mb1 mt0'>
              When you release a new version of the app, you shouldn't stop the server, deploy the code and restart the
              server.
            </p>
            <p className='pl4 ml2 lh-copy measure mt0'>That could cause downtime. How do you avoid it?</p>
          </li>
          <li className='f4-l lh-copy mv3 cf'>
            <p className='pl4 ml2 b lh-copy measure mb1 mt0'>When the release has a bug, you need a plan B.</p>
            <p className='pl4 ml2 lh-copy measure mt0'>
              You could duplicate the src folders and renaming it to `_old`. But that's a hack at best.
            </p>
          </li>
          <li className='f4-l lh-copy mv3 cf'>
            <p className='pl4 ml2 b lh-copy measure mb1 mt0'>
              When you develop projects made of several Node.js apps, you need to keep track of what service uses which
              port.
            </p>
            <p className='pl4 ml2 lh-copy measure mt0'>It's hard to tell if 4567 is another service or the database.</p>
          </li>
        </ul>
        <p className='lh-copy f4-l black-70 i'>But that list is just the tip of the iceberg.</p>
        <p className='lh-copy f4-l black-70'>
          You should also consider setting up HTTPS and automated certificate renewal for your domains, centralized
          logging, clustering for your app, etc.
        </p>
        <h2 className='f2 navy lh-solid'>Deploying your app is not a small feat</h2>
        <p className='lh-copy f4-l black-70'>And you could easily spend months automating it to perfection.</p>
        <p className='lh-copy f4-l black-70'>And once you're done, you end up managing with your unique setup.</p>
        <p className='lh-copy f4-l black-70 i'>Good luck on getting more team members on board or fixing an issue.</p>
        <ul className='pl0 pt2'>
          <ListItemQuestion>
            <span className='b'>But what if</span> instead of starting from scratch{' '}
            <span className='b'>you could use a standard stack</span>
            that includes the components that you need such as automatic deployments, scaling and a reverse proxy to
            handle the routes?
          </ListItemQuestion>
          <ListItemQuestion>
            <span className='b'>And what if you could create it with a single click?</span> Ideally creating more
            instances could be scripted so that you won't have to repeat yourself.
          </ListItemQuestion>
          <ListItemQuestion>
            <span className='b'>What if </span>that could work on your laptop, as well as{' '}
            <span className='b'>on the cloud and in your company servers?</span>
          </ListItemQuestion>
        </ul>
        <p className='lh-copy f4-l black-70'>You could:</p>
        <ul className='pa2'>
          <ListItem className='black-70'>
            spend less time managing infrastructure and <span className='b'>more time coding!</span>
          </ListItem>
          <ListItem className='black-70'>
            stop worrying about components silently falling apart in the middle of the night
          </ListItem>
          <ListItem className='black-70'>
            <span className='b'>scale your apps to millions of users</span> with the confidence that it is built on a
            solid foundation
          </ListItem>
        </ul>
        <p className='lh-copy f4-l black-70 i'>Is it just a dream?</p>
        <h2 className='f2 navy lh-solid'>
          Kubernetes and containers offer just that — the fundamental blocks for deploying apps at scale
        </h2>
        <p className='lh-copy f4-l black-70'>When you switch to Kubernetes, this is what happens to your apps:</p>
        <ul className='pa2'>
          <ListItem className='black-70'>
            You package your app and all of its dependencies such as Node.js, the npm modules and any binary into a
            single archive called container.
          </ListItem>
          <ListItem className='black-70'>
            <span className='b'>Containers are self-sufficient, and they can run anywhere.</span> Even if there's no
            Node.js installed.
          </ListItem>
          <ListItem className='black-70'>
            You upload the container to a registry, similar to what you do with your Node.js packages.{' '}
            <span className='i'>
              Side effect: you have a collection of past containers that you can use to roll back.
            </span>
          </ListItem>
          <ListItem className='black-70'>
            You define how many copies of the app you wish to have and any memory or CPU limit. You submit the request
            to Kubernetes and watch application coming to life.{' '}
            <span className='b'>Kubernetes takes the necessary step to download, run and scale the app.</span>
          </ListItem>
          <ListItem className='black-70'>
            When the app crashes (perhaps you forgot to handle an uncaught exception?), Kubernetes restarts it
            automatically.
          </ListItem>
          <ListItem className='black-70'>
            When you release a new version of the app,{' '}
            <span className='b'>Kubernetes rolls out the changes incrementally with zero downtime.</span>
          </ListItem>
          <ListItem className='black-70'>
            If you have multiple apps, <span className='b'>Kubernetes has a built-in reverse proxy</span> that handles
            domain and path-based routing
          </ListItem>
          <ListItem className='black-70'>
            When you're developing several apps and using databases, Kubernetes makes it easier to connect and consume
            those with <span className='b'>integrated service discovery.</span>
          </ListItem>
        </ul>
        <p className='lh-copy f4-l black-70 i'>Too good to be true, where's the catch?</p>
        <p className='lh-copy f4-l black-70'>
          Things that are very general and powerful will always require some level of skill to use.
        </p>
        <p className='lh-copy f4-l black-70'>And Kubernetes isn't an exception.</p>
        <p className='b f2 lh-solid navy'>Kubernetes is known to have a steep learning curve</p>
        <p className='lh-copy f4-l black-70'>It's also well known for being non-beginner-friendly.</p>
        <p className='lh-copy f4-l black-70 i'>A shame for such a useful and promising technology.</p>
        <p className='lh-copy f4-l black-70 b'>Not anymore.</p>
        <p className='f2 lh-solid navy b'>Enter Zero to Kubernetes</p>
        <p className='lh-copy f4-l black-70 b'>
          A step-by-step course on how to design, develop and deploy applications in Kubernetes.
        </p>
        <p className='lh-copy f4-l black-70'>
          In this course, you will learn how to build a note-taking application that can store images and text similar
          to Evernote or Google Keep.
        </p>
        <p className='lh-copy f4-l black-70'>And you will learn how to:</p>
        <ul className='pa2'>
          <ListItem className='black-70'>develop an application from scratch in Node.js and MongoDB</ListItem>
          <ListItem className='black-70'>containerize your application using Docker</ListItem>
          <ListItem className='black-70'>deploy the app in Kubernetes and scale it locally</ListItem>
          <ListItem className='black-70'>manage shared storage for your application</ListItem>
          <ListItem className='black-70'>deploy and scale your application on Amazon EKS</ListItem>
        </ul>
        <p className='lh-copy f4-l black-70'>
          The course includes a certificate of completion when you complete online.
        </p>
        <img src='assets/02k8s/certificate.svg' alt='' className='w-60 shadow-4 center db mv4' />
        <p className='lh-copy f4-l black-70'>
          However, if you wish to study and want practice offline (during the morning commute),{' '}
          <span className='b'>you can download the ebook too.</span>
        </p>
        <img src='assets/02k8s/zero2k8s-js.svg' alt='' className='w-60 shadow-1 center db mv4' />
        <p className='lh-copy f4-l black-70'>The course is free, and you can start your Kubernetes journey now.</p>
      </div>
      <div className='center mw7 ph3 pt2'>
        <h2 className='f2 lh-solid navy'>The course is free, and you can start learning Kubernetes now</h2>
        <p className='lh-copy measure f4 black-70'>
          Enter your email address and receive a link to access the Learnk8s Academy.
        </p>

        <Form />

        <section className='mv4'>
          <p className='f3 f2-l navy b'>Learnk8s trains over 300+ engineers a year in Kubernetes</p>
          <p className='lh-copy f4-l black-70 measure'>
            The systems, techniques, and processes you'll learn in the Learnk8s Academy have been developed over 2+
            years during our hands-on, instructor-led workshops.
          </p>
          <div className='feedback tc'>
            <Feedback
              className='mw5 dib mv3'
              author='Mauricio Salatino'
              role='Activiti Cloud Team Lead'
              description='The course is totally worth the money and time, if you have a team that is getting started with Kubernetes and want to validate the approach that you are taking as well as to level up your knowledge on K8s, this is the way to go.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Marcello Teodori'
              role='Architect'
              description='This is the course you have to do to put all the pieces in the right place and challenge yourself to really master your knowledge of Kubernetes. Wish I had done it long ago.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Yawwani Gunawardaba'
              role='Data Scientist'
              description='Good course with practical labs.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Sandeep Sarthavalli Ramesh'
              role='Software developer'
              description='A good course to get started with Kubernetes with enough confidence to deploy, debug and progress in the world of k8s.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='David Heward'
              role='Senior DevOps Engineer'
              description='A really enjoyable 3-day workshop on Kubernetes. I cemented my understanding of Kubernetes and can now start implementing and furthering my knowledge with real examples and workflows. Next stop, production experience.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Chris Cooney'
              role='Senior Software Engineer'
              description={`We previously had a couple of people talking about Kubernetes in the pub. Now half the office are raving about it. I don't think reading documentation alone would have done that for us, it needed some people to come in and show us what is possible, validate the ideas we've already had and give us guidance on where to go next. Now everyone has a clear, shared vision and a mission. All that's left is to take the first few steps.`}
            />
            <Feedback
              className='mw5 dib mv3'
              author='Luke Anderson'
              role='Senior IT Engineer'
              description='It is an excellent course covering a wide range of Kubernetes concepts, that will give you more than enough knowledge to go back to experiment and be productive with Kubernetes.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Mark Gardiner'
              role='Infrastructure Developer'
              description='This is very intensive course, particularly if you are new to cloud computing or networking concepts.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Przemek Anuszek'
              role='Cloud architect'
              description='The training is very well prepared and also very well performed.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Eda Meadows'
              role='Polyglott Developer'
              description='Clear, good explanations with good use of diagrams.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Sara Aspery'
              role='Software Engineer'
              description='Be prepared to learn a lot and enjoy the hands-on sessions.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Ryan Dawson'
              role='Software Developer'
              description='Learnk8s know this stuff, have put a lot of thought into the course and will put a lot of thought into your questions too!'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Grant Hammond'
              role='Senior Linux Engineer'
              description='Essential knowledge. I mostly enjoyed finding out how the components were doing their thing under the hood and how traffic is/was actually being shunted around.'
            />
            <Feedback
              className='mw5 dib mv3'
              author='Antonio Troina'
              role='Senior Software Developer'
              description='Great experience. Going back to the office with a much better understanding of the topic. Useful exercises, great Q&A session with clarification.'
            />
          </div>
        </section>

        <FAQs faqs={faqs} />

        <p className='f2 b lh-solid navy'>Start learning Kubernetes now</p>
        <Form />
      </div>
    </Layout>,
  )
}

function SubmitWithAjax() {
  var form = document.querySelector('form')
  var success = document.querySelector('.success')
  var failure = document.querySelector('.failure')
  if (!form || !success || !failure) {
    return
  }
  form.addEventListener('submit', function(event) {
    success!.classList.add('dn')
    failure!.classList.add('dn')
    const emailElement = form!.querySelector('#MERGE0') as HTMLInputElement
    const firstnameElement = form!.querySelector('#MERGE1') as HTMLInputElement
    const user = form!.querySelector('[name=u]') as HTMLInputElement
    const id = form!.querySelector('[name=id]') as HTMLInputElement
    if (!emailElement || !firstnameElement || !user || !id) {
      return
    }
    event.preventDefault()
    var email = (emailElement.value + '').trim()
    if (email === '' || !/\w+@\w+\.\w{2,10}/gi.test(email)) {
      return failure!.classList.remove('dn')
    }
    var firstname = (firstnameElement.value + '').trim()
    var url = form!.getAttribute('action')
    var args = [
      'id=' + encodeURIComponent(id.value),
      'u=' + encodeURIComponent(user.value),
      'EMAIL=' + encodeURIComponent(email),
      'FNAME=' + encodeURIComponent(firstname),
    ]
    submit(`${url}-json?${args.join('&')}`)
    success!.classList.remove('dn')
  })
  function submit(url: string) {
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.send()
  }
}

const FAQs: React.StatelessComponent<{ faqs: FAQ[] }> = ({ faqs }) => {
  return (
    <section className='pv4'>
      <h3 className='f3 f2-l navy pb3'>Frequently asked questions</h3>
      <ul className='list pl0'>
        {faqs.map((it, index) => {
          return (
            <li key={index}>
              <h4 className='navy f4 f3-l mb2'>{it.title}</h4>
              <p className='lh-copy black-70 measure-wide'>
                <InlineMarkdown content={it.content} />
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export const Form: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <div id='subscription-form' className='mb5 mt5 mt0-l measure'>
      <form action='https://learnk8s.us19.list-manage.com/subscribe/post' method='POST' className='relative'>
        <ol className='list pl0'>
          <li>
            <label htmlFor='MERGE1' className='db tl ttu pb2 fw6'>
              Your first name
            </label>
            <input
              className='pa3 w-100 br3 input-reset ba b--silver'
              type='text'
              name='MERGE1'
              id='MERGE1'
              placeholder='Your first name'
            />
          </li>
          <li className='mt4'>
            <label htmlFor='MERGE0' className='db tl ttu pb2 fw6'>
              Your email address
            </label>
            <input
              className='pa3 w-100 br3 input-reset ba b--silver'
              type='email'
              required={true}
              name='MERGE0'
              id='MERGE0'
              placeholder='Your email address'
            />
          </li>
        </ol>
        <button className='link dib white bg-blue br1 ph4 pv3 b f4 shadow-4 mv3 submit tl br2' type='submit'>
          Start now ⇢
        </button>
        <p className='success absolute bottom mt1 w-100 bg-light-green pa2 dark-green b--dark-green bw1 b--solid dn'>
          Thank you for subscribing!
        </p>
        <p className='failure absolute bottom mt1 w-100 bg-light-red pa2 black b--dark-red bw1 b--solid dn'>
          Invalid email.
        </p>
      </form>
      <script dangerouslySetInnerHTML={{ __html: `(${SubmitWithAjax.toString()})()` }} />
    </div>
  )
}
