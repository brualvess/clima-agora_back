import axios from 'axios'
import dayjs from 'dayjs'
import dotenv from 'dotenv';

dotenv.config()

async function buscarCidade(cidade: string) {
    const urlCodificada = encodeURI(`https://dataservice.accuweather.com/locations/v1/cities/BR/search?q=${cidade}&apikey=${process.env.apiKey}`)
    const buscarCidade = await axios.get(
        `${urlCodificada}`
    )
    const informacoes = buscarCidade.data[0]
    const obj = {
        cidade: informacoes.LocalizedName,
        sigla: informacoes.AdministrativeArea.ID,
        chave: informacoes.Key
    }
    return obj
}
async function clima(cidade: any) {
    const informacoes = await buscarCidade(cidade)
    const retorno = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${informacoes.chave}?apikey=sANcDb0LqAhJA5I5SubU1rPJhPBLMUiF&language=pt-br&metric=true`
    )
    const data = dayjs().locale('pt-br').format('DD/MM/YYYY h:mm:ss A')
    const obj = {
        cidade: informacoes.cidade,
        sigla: informacoes.sigla,
        texto: retorno.data.Headline.Text,
        temperaturaMinima: retorno.data.DailyForecasts[0].Temperature.Minimum.Value,
        temperaturaMaxima: retorno.data.DailyForecasts[0].Temperature.Maximum.Value,
        data: data
    }
    return obj;
}
export const climaService = {
    clima
}



