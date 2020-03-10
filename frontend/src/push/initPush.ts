navigator.serviceWorker.register('/service-worker')

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

navigator.serviceWorker.ready
  .then((registration) => {

    return registration.pushManager.getSubscription()
      .then(async (subscription) => {

        if (subscription) {
          return subscription
        }

        const response = await fetch('/push/publickey')
        const vapidPublicKey = await response.text()

        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        })
      }).catch(e => {
        console.error(e)
      })
  }).then((subscription) => {

    fetch('/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        subscription,
      }),
    })

  }).catch(e => {
    console.error(e)
  })
