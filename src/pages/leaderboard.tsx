import { trpc } from "../utils/api"
import { nanoid } from "nanoid"
import Image from "next/image"

export default function Leaderboard() {
  const { isLoading, isError, data, error } =
    trpc.pokemons.getAllPokemons.useQuery(undefined, { retry: false })
  if (isLoading) {
    return "Loading..."
  }

  if (isError) {
    return error.message
  }

  const pokemons = data.map((pokemon, i) => ({
    ...pokemon,
    rank: i,
    pointsFor: i
  }))

  const columns = [
    {
      key: "rank",
      width: "20%",
      header: "Place"
    },
    {
      key: "name",
      width: "50%",
      header: "Name"
    },
    {
      key: "pointsFor",
      width: "30%",
      header: "Points"
    }
  ]

  return (
    <div className=" mx-auto mt-8 max-w-2xl">
      <table className="w-full">
        <thead className="border-b-1 h-[50px]">
          <tr>
            {columns.map((col) => (
              <td
                key={col.header}
                width={col.width}
                className="text-center"
              >
                {col.header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(even)]:bg-gray-100">
          {pokemons.map((pokemon) => (
            <tr
              key={nanoid()}
              className=" min-w-[800px]"
            >
              <td className="w-[20%] text-center">{pokemon.rank}</td>
              <td className="flex items-center justify-center gap-4">
                <Image
                  src={pokemon.image}
                  width={75}
                  height={75}
                  alt="Pokemon avatar"
                />
                <p>{pokemon.name}</p>
              </td>
              <td className="text-center">{pokemon.pointsFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
