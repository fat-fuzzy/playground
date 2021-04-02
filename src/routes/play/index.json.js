import scene from './_scene.js'

const contents = JSON.stringify(
  scene.map((scene) => {
    return {
      title: scene.title,
      slug: scene.slug,
    }
  }),
)

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  })

  res.end(contents)
}
