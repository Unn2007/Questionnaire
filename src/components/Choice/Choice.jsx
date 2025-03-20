import css from './Choice.module.css'

export const Choice = ({ choice, updateChoice, removeChoice }) => {
  return (
    <div className={css.choise}>
      <h4 className={css.choiceHeader}>Choice</h4>

      <input
        type="text"
        value={choice.text}
        onChange={(e) => updateChoice(choice.id, e.target.value)}
        placeholder="Введіть варіант відповіді"
        className={css.input}
      />
      <button onClick={() => removeChoice(choice.id)} className="button">
        Remove
      </button>
    </div>
  );
};