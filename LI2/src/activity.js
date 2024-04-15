/**
 * Функция для получения случайной активности с внешнего API.
 * @returns {Promise<string>} Строка с активностью.
 */
export async function getRandomActivity() {
  try {
    const response = await fetch('https://www.boredapi.com/api/activity/');
    const data = await response.json();
    return data.activity;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return "К сожалению, произошла ошибка";
  }
}

/**
 * Функция для обновления активности на веб-странице.
 * @param {string} activity - Новая активность для отображения.
 * @returns {Promise<void>}
 */
export async function updateActivity(activity){
  const element = document.querySelector("#activity");
  element.textContent = activity;
}

/**
 * Функция для обновления случайной активности каждую минуту.
 * @returns {Promise<void>}
 */
export async function updateRandomActivityEveryMinute() {
  /**
   * Функция для обновления активности.
   * @returns {Promise<void>}
   */
  async function refreshActivity() {
    const activity = await getRandomActivity();
    updateActivity(activity);
  }

  // Обновляем активность сразу и запускаем интервал для обновления каждую минуту
  await refreshActivity();
  setInterval(refreshActivity, 60000); 
}
