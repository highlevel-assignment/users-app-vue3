import { createApp } from 'vue';
import UserCard from './components/UserCard.vue'
import messages from './i18n/messages'

const injectTranslation = (props) => {
  Object.keys(messages).forEach(lang => {
    props.i18n.setLocaleMessage(lang, {
      ...messages[lang]
    })
  })
}

export const mount = (el, props) => {
  injectTranslation(props)
  const app = createApp(UserCard, props)
  app.config.globalProperties.$t = props.i18n.t.bind(props.i18n)
  app.mount(el)
}
