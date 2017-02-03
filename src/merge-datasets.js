import { state, data } from "data/json"

export const mergeData = () => {

  const _state = state
  let count1 = 0

  let countiesTopoData = state.objects.counties.geometries.sort((a, b) => a.properties.name.localeCompare(b.properties.name))
  let countiesVoterData = data.counties.sort((a, b) => a.name.localeCompare(b.name))

  for (let i = 0; i < 58; i++) {
    countiesTopoData[i].properties.clinton = countiesVoterData[i].clinton
    countiesTopoData[i].properties.trump = countiesVoterData[i].trump
    countiesTopoData[i].properties.countyInfo = countiesVoterData[i].name
  }
  return countiesTopoData
}
