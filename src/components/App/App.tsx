import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{/* Пагінація */}
            {/* Кнопка створення нотатки */}
            <button className={css.button}>Create note +</button>

          </header>
          <ul className={css.list}>
	{/* Набір елементів списку нотаток */}
  <li className={css.listItem}>
    <h2 className={css.title}>Note title</h2>
    <p className={css.content}>Note content</p>
    <div className={css.footer}>
      <span className={css.tag}>Note tag</span>
      <button className={css.button}>Delete</button>
    </div>
  </li>
</ul>

</div>

        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </>
  )
}

export default App
