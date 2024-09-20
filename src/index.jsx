import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import { store } from './store/store'
import { RootCmp } from './RootCmp'

import './assets/styles/main.scss'

import appleTouchIcon from './assets/img/favicon/apple-touch-icon.png'
import favicon32 from './assets//img/favicon/favicon-32x32.png'
import favicon16 from './assets/img/favicon/favicon-16x16.png'
import siteManifest from './assets/img/favicon/site.webmanifest'

function HeadImports() {
	useEffect(() => {
		document.querySelector('link[rel="apple-touch-icon"]').href = appleTouchIcon
		document.querySelector('link[rel="icon"][sizes="32x32"]').href = favicon32
		document.querySelector('link[rel="icon"][sizes="16x16"]').href = favicon16
		document.querySelector('link[rel="manifest"]').href = siteManifest
	}, [])

	return null
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<Router>
			<HeadImports />
			<RootCmp />
		</Router>
	</Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
