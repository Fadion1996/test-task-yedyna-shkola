import { useMemo } from 'react'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const Details = () => {

  const studentsQuantity = useSelector(state => state.students.studentsQuantity)
  const columns = useSelector(state => state.students.columns)

  const maxRateColumn = useMemo(() => {
    const sortedColumn = columns.map(column =>
      column.Title.split('/').reduce((acc, cur) => +acc + +cur)
    )
    const columnIndex = sortedColumn.findIndex(item => item === Math.max(...sortedColumn))

    return columns[columnIndex].Title
  }, [columns])

  return (
    <Card sx={{ margin: '5%' }}>
      <CardHeader title="Загальна Інформація" sx={{ textAlign: 'center' }} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h8" color="text.secondary">
          Lorem Ipsum є псевдо- латинський текст використовується у веб - дизайні, типографіка, верстка, і друку замість англійської підкреслити елементи дизайну над змістом. Це також називається заповнювач ( або наповнювач) текст. Це зручний інструмент для макетів. Це допомагає намітити візуальні елементи в документ або презентацію, наприклад, друкарня, шрифт, або макет. Lorem Ipsum в основному частиною латинського тексту за класичною автор і філософа Цицерона. Це слова і букви були змінені додаванням або видаленням, так навмисно роблять його зміст безглуздо, це не є справжньою, правильно чи зрозумілою Латинської більше. У той час як Lorem Ipsum все ще нагадує класичну латину, він насправді не має ніякого значення. Як текст Цицерона не містить літери K, W, або Z, чужі латина, ці та інші часто вставляється випадково імітувати типографський Зовнішність європейських мовах, як і орграфов будуть знайдено в оригіналі.
        </Typography>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <Typography variant="h6" color="text.secondary">
              Найбільша сума цифр в полі Title
            </Typography>
            <Typography variant="h4">
              {maxRateColumn}
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <Typography variant="h6" color="text.secondary">
              Кількість учнів
            </Typography>
            <Typography variant="h4">
              {studentsQuantity}
            </Typography>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default Details