import { Image } from '../assets'
import { Details, BiteSizedRender } from '../biteSized'

export const CreateVsApplyDetails = identity<Details>({
  type: identity<'bsk-april-01'>('bsk-april-01'),
  url: '/kubectl-create-vs-apply',
  seoTitle: 'kubectl create vs apply',
  title: 'kubectl create vs apply',
  description: `description`,
  openGraphImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
  }),
  publishedDate: '2019-01-09',
  previewImage: Image({
    url: 'src/k8sOnWindows/k8s_on_win.jpg',
    description: 'placeholder',
  }),
  author: {
    fullName: 'Eduardo Baitello',
    avatar: Image({ url: 'assets/authors/eduardo_baitello.jpg', description: 'Eduardo Baitello' }),
    link: 'https://twitter.com/EduardoBaitello',
    shortDescription: 'Eduardo is <please insert description here>',
  },
})

export const CreateVsApplyRender = BiteSizedRender(`${__dirname}/createVsApply.md`, __dirname)

function identity<T>(value: T): T {
  return value
}
