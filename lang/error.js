var words = {
  en: {
    404: {
      title: "Alina Shevyakova. Page Not Found",
      header: "404 Error: Page not Found",
      descr: '<p>Sorry, but the page you are looking for has not been found. Perhaps it has been deleted.</p>'
    },
    500: {
      title: "Alina Shevyakova. Error occured",
      header: "500 Error: Some error occured",
      descr: '<p>Sorry, but there is some error occured. We already know about it and working on it.</p>'
    }
  },
  ru: {
    404: {
      title: "Алина Шевякова. Страница не найдена",
      header: "404: Страница не найдена",
      descr: '<p>К сожалению мы не можем найти страницу, которую вы ищете. Возможно она была удалена</p>'
    },
    500: {
      title: "Алина Шевякова. Произошла ошибка",
      header: "500: Что-то случилось",
      descr: '<p>К сожалению что-то пошло не так. Мы знаем об этой проблеме и уже занимаемся ею</p><p>Попробуйте открыть другую страницу</p>'
    }
  }
};

module.exports = words;