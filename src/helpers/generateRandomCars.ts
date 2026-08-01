import { CAR_BRANDS, CAR_MODELS } from "../constants/cars"

const randomCarName = (carItems: Array<string>)  => {
 return carItems[Math.floor(Math.random() * carItems.length)]
}

const radomCarColor = () => {
  let color = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
  return `#${color}`
}

const getRandomCar = () => {
  return {
    name: `${randomCarName(CAR_BRANDS)} ${randomCarName(CAR_MODELS)}`,
    color: radomCarColor()
  }
}

export default getRandomCar