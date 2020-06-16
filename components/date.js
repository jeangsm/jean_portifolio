import { parseISO, format } from 'date-fns'
import locale from 'date-fns/locale/pt-BR'

export default function Date({ dateString }) {
    var eoLocale = locale
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, "d 'de' LLLL 'de' yyyy", {locale: eoLocale})}</time>
}