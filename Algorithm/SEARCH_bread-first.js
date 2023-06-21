/**
 * Breadth-First Search Algorithm
 * https://www.youtube.com/watch?v=HZ5YTanv5QE
 *
 * Use for traversing the graph of points
 * that connect between each other in CYCLE
 * CYCLE relationship
 * @param {*} graph
 * @param {*} start
 * @param {*} end
 * @returns
 */
const bfs = (graph, start, end) => {
  const queue = []
  const visited = []

  let layer = 0 //order logic that need to be calculated

  //start traversing
  visited.push(start)
  queue.push(start)

  while (!visited.includes(end)) {
    //depends on the logic you want
    const curr = queue.pop()

    layer++ //calculated logic

    if (!curr) return -1

    graph[curr].forEach((node) => {
      if (!visited.includes(node)) {
        visited.push(node)
        queue.push(node)
      }
    })
  }

  return layer
}

/**
 * convert array then return it as an object in graph format
 * @param {Array} arr
 * @returns object
 */
/*
    {
        "fred": ["joe","mary"],
        "joe": ["fred","mary"],
        "mary": ["joe","fred","bill"],
        "bill": ["mary"]
    }
 */
const createGraph = (arr = []) => {
  const graph = arr.reduce((acc, curr) => {
    const connect = curr.split(':')
    const pointA = connect[0]
    const pointB = connect[1]

    if (acc[pointA]) {
      acc[pointA] = [...acc[pointA], pointB]
    } else {
      acc[pointA] = [pointB]
    }

    if (acc[pointB]) {
      acc[pointB] = [...acc[pointB], pointA]
    } else {
      acc[pointB] = [pointA]
    }

    return acc
  }, {})

  return graph
}

const connection = ['fred:joe', 'joe:mary', 'mary:fred', 'mary:bill']
const name1 = 'fred'
const name2 = 'bill'

const graph = createGraph(connection)
const ans = bfs(graph, name1, name2)

// const connectionA = ['fred:joe', 'joe:mary', 'kate:sean', 'sean:sally']
// const name1A = 'fred'
// const name2A = 'sally'
// const graph = createGraph(connectionA)
// const ans = bfs(graph, name1A, name2A)

console.log({ ans })
