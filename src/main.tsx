import { createRoot } from 'react-dom/client'
import { App } from './App'
import { portfolio } from './data/portfolio'
import './styles.css'

document.title = `${portfolio.name} — Computer Science & Development`
const description = document.createElement('meta')
description.name = 'description'
description.content = portfolio.introduction
document.head.append(description)

createRoot(document.getElementById('root')!).render(<App />)
