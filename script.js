'use strict';

const STORAGE_KEYS = {
  expenses: 'personalExpenseTracker.expenses',
  limits: 'personalExpenseTracker.limits',
  baseCurrency: 'personalExpenseTracker.baseCurrency',
  heroImage: 'personalExpenseTracker.heroImage',
  theme: 'personalExpenseTracker.theme',
  language: 'personalExpenseTracker.language',
  categoryEmojis: 'personalExpenseTracker.categoryEmojis'
};

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Subscriptions', 'Other'];
const CURRENCIES = ['KZT', 'USD', 'EUR', 'RUB'];
const THEMES = ['soft', 'night'];
const LANGUAGES = ['en', 'ru'];

const CATEGORY_COLORS = {
  Food: '#d88484',
  Transport: '#e7c26a',
  Entertainment: '#d89b2f',
  Subscriptions: '#9b86d6',
  Other: '#c98c9e'
};

const DEFAULT_EMOJIS = {
  Food: '🍽️',
  Transport: '🚕',
  Entertainment: '🎬',
  Subscriptions: '🔁',
  Other: '✨'
};

const RATES_TO_KZT = {
  KZT: 1,
  USD: 470,
  EUR: 510,
  RUB: 5.2
};

const I18N = {
  en: {
    appTitle: 'Personal Expense Tracker',
    heroEyebrow: 'Private dashboard',
    heroCopy: 'Track daily spending, compare categories, set limits, and keep everything stored privately in this browser.',
    welcome: 'WELCOME',
    loading: 'Loading...',
    baseCurrency: 'Base currency',
    theme: 'Theme',
    language: 'Language',
    addPhoto: 'Add photo',
    removePhoto: 'Remove photo',
    exportCsv: 'Export CSV',
    totalExpenses: 'Total Expenses',
    records: 'Records',
    visibleExpenses: 'Visible expenses',
    highestCategory: 'Highest Category',
    none: 'None',
    allTime: 'All Time',
    lastWeek: 'Last Week',
    lastMonth: 'Last Month',
    newRecord: 'New record',
    addExpense: 'Add Expense',
    editExpenseTitle: 'Edit Expense',
    updateExpense: 'Update Expense',
    cancelEdit: 'Cancel Edit',
    category: 'Category',
    chooseCategory: 'Choose category',
    amount: 'Amount',
    currency: 'Currency',
    date: 'Date',
    description: 'Description',
    optional: '(optional)',
    descriptionPlaceholder: 'Lunch, metro ticket, streaming subscription...',
    visualization: 'Visualization',
    categoryPieChart: 'Category Pie Chart',
    addFirstExpense: 'Add your first expense',
    emptyListCopy: 'Your filtered expense list will appear here.',
    notionStyle: 'Notion style',
    categoryEmojis: 'Category Emojis',
    emojiHint: 'Saved instantly',
    limitsAndTotals: 'Limits and totals',
    categoryBreakdown: 'Category Breakdown',
    history: 'History',
    allExpenses: 'All Expenses',
    actions: 'Actions',
    limitExceeded: 'Limit exceeded',
    limitIn: 'Limit in',
    noLimit: 'no limit',
    used: 'used',
    save: 'Save',
    noDescription: 'No description',
    edit: 'Edit',
    delete: 'Delete',
    chartLoadError: 'Chart.js could not load',
    categoryRequired: 'Category is required.',
    amountRequired: 'Amount must be greater than 0.',
    photoTooLarge: 'Image is too large for localStorage. Try a smaller file.',
    csvFile: 'personal-expenses',
    categories: {
      Food: 'Food',
      Transport: 'Transport',
      Entertainment: 'Entertainment',
      Subscriptions: 'Subscriptions',
      Other: 'Other'
    }
  },
  ru: {
    appTitle: 'Personal Expense Tracker',
    heroEyebrow: 'Личный дашборд',
    heroCopy: 'Отслеживайте расходы, сравнивайте категории, задавайте лимиты и храните данные только в этом браузере.',
    welcome: 'WELCOME',
    loading: 'Загрузка...',
    baseCurrency: 'Базовая валюта',
    theme: 'Тема',
    language: 'Язык',
    addPhoto: 'Добавить фото',
    removePhoto: 'Убрать фото',
    exportCsv: 'Экспорт CSV',
    totalExpenses: 'Всего расходов',
    records: 'Записи',
    visibleExpenses: 'Показанные расходы',
    highestCategory: 'Главная категория',
    none: 'Нет',
    allTime: 'Все время',
    lastWeek: 'Неделя',
    lastMonth: 'Месяц',
    newRecord: 'Новая запись',
    addExpense: 'Добавить расход',
    editExpenseTitle: 'Редактировать расход',
    updateExpense: 'Сохранить расход',
    cancelEdit: 'Отмена',
    category: 'Категория',
    chooseCategory: 'Выберите категорию',
    amount: 'Сумма',
    currency: 'Валюта',
    date: 'Дата',
    description: 'Описание',
    optional: '(необязательно)',
    descriptionPlaceholder: 'Обед, такси, подписка...',
    visualization: 'Визуализация',
    categoryPieChart: 'Круговая диаграмма',
    addFirstExpense: 'Добавьте первый расход',
    emptyListCopy: 'Здесь появится отфильтрованный список расходов.',
    notionStyle: 'Как в Notion',
    categoryEmojis: 'Emoji категорий',
    emojiHint: 'Сохраняется сразу',
    limitsAndTotals: 'Лимиты и итоги',
    categoryBreakdown: 'Расходы по категориям',
    history: 'История',
    allExpenses: 'Все расходы',
    actions: 'Действия',
    limitExceeded: 'Лимит превышен',
    limitIn: 'Лимит в',
    noLimit: 'нет лимита',
    used: 'использовано',
    save: 'Сохранить',
    noDescription: 'Без описания',
    edit: 'Изменить',
    delete: 'Удалить',
    chartLoadError: 'Chart.js не загрузился',
    categoryRequired: 'Категория обязательна.',
    amountRequired: 'Сумма должна быть больше 0.',
    photoTooLarge: 'Фото слишком большое для localStorage. Выберите файл меньше.',
    csvFile: 'lichnye-rashody',
    categories: {
      Food: 'Еда',
      Transport: 'Транспорт',
      Entertainment: 'Развлечения',
      Subscriptions: 'Подписки',
      Other: 'Другое'
    }
  }
};

const state = {
  expenses: [],
  limits: {},
  filter: 'all',
  baseCurrency: 'KZT',
  heroImage: '',
  theme: 'soft',
  language: 'en',
  categoryEmojis: { ...DEFAULT_EMOJIS },
  chart: null
};

const els = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  loadState();
  setDefaultDate();
  bindEvents();
  applySettings();
  render();
  startWelcomeScreen();
});

function cacheElements() {
  els.welcomeScreen = document.getElementById('welcomeScreen');
  els.welcomeTime = document.getElementById('welcomeTime');
  els.welcomeWeekday = document.getElementById('welcomeWeekday');
  els.welcomeCountdown = document.getElementById('welcomeCountdown');
  els.welcomeTitle = document.querySelector('.welcome-panel h1');
  els.app = document.getElementById('app');
  els.hero = document.getElementById('hero');
  els.heroImage = document.getElementById('heroImage');
  els.clearHeroImage = document.getElementById('clearHeroImage');
  els.themeSelect = document.getElementById('themeSelect');
  els.languageSelect = document.getElementById('languageSelect');
  els.form = document.getElementById('expenseForm');
  els.expenseId = document.getElementById('expenseId');
  els.category = document.getElementById('category');
  els.amount = document.getElementById('amount');
  els.currency = document.getElementById('currency');
  els.date = document.getElementById('date');
  els.description = document.getElementById('description');
  els.formError = document.getElementById('formError');
  els.submitExpense = document.getElementById('submitExpense');
  els.cancelEdit = document.getElementById('cancelEdit');
  els.formTitle = document.getElementById('expenseFormTitle');
  els.baseCurrency = document.getElementById('baseCurrency');
  els.exportCsv = document.getElementById('exportCsv');
  els.filterButtons = document.querySelectorAll('.filter-button');
  els.totalExpenses = document.getElementById('totalExpenses');
  els.expenseCount = document.getElementById('expenseCount');
  els.highestCategory = document.getElementById('highestCategory');
  els.highestCategoryAmount = document.getElementById('highestCategoryAmount');
  els.filterLabel = document.getElementById('filterLabel');
  els.emojiSettings = document.getElementById('emojiSettings');
  els.categoryBreakdown = document.getElementById('categoryBreakdown');
  els.tableBody = document.getElementById('expenseTableBody');
  els.emptyState = document.getElementById('emptyState');
  els.chartCanvas = document.getElementById('categoryChart');
  els.chartEmpty = document.getElementById('chartEmpty');
}

function loadState() {
  state.expenses = safeJsonParse(localStorage.getItem(STORAGE_KEYS.expenses), [])
    .filter(isValidExpense);
  state.limits = safeJsonParse(localStorage.getItem(STORAGE_KEYS.limits), {});
  state.categoryEmojis = {
    ...DEFAULT_EMOJIS,
    ...safeJsonParse(localStorage.getItem(STORAGE_KEYS.categoryEmojis), {})
  };
  state.heroImage = localStorage.getItem(STORAGE_KEYS.heroImage) || '';
  state.baseCurrency = CURRENCIES.includes(localStorage.getItem(STORAGE_KEYS.baseCurrency))
    ? localStorage.getItem(STORAGE_KEYS.baseCurrency)
    : 'KZT';
  state.theme = THEMES.includes(localStorage.getItem(STORAGE_KEYS.theme))
    ? localStorage.getItem(STORAGE_KEYS.theme)
    : 'soft';
  state.language = LANGUAGES.includes(localStorage.getItem(STORAGE_KEYS.language))
    ? localStorage.getItem(STORAGE_KEYS.language)
    : 'en';
}

function safeJsonParse(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function isValidExpense(expense) {
  return expense
    && typeof expense.id === 'string'
    && CATEGORIES.includes(expense.category)
    && Number(expense.amount) > 0
    && CURRENCIES.includes(expense.currency)
    && typeof expense.date === 'string';
}

function bindEvents() {
  els.form.addEventListener('submit', handleFormSubmit);
  els.cancelEdit.addEventListener('click', resetForm);
  els.baseCurrency.addEventListener('change', () => {
    state.baseCurrency = els.baseCurrency.value;
    persist(STORAGE_KEYS.baseCurrency, state.baseCurrency);
    render();
  });
  els.themeSelect.addEventListener('change', () => {
    state.theme = els.themeSelect.value;
    persist(STORAGE_KEYS.theme, state.theme);
    applyTheme();
    render();
  });
  els.languageSelect.addEventListener('change', () => {
    state.language = els.languageSelect.value;
    persist(STORAGE_KEYS.language, state.language);
    applyLanguage();
    resetFormLabels();
    render();
  });
  els.heroImage.addEventListener('change', handleHeroImageUpload);
  els.clearHeroImage.addEventListener('click', clearHeroImage);
  els.exportCsv.addEventListener('click', exportCsv);
  els.filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.filter = button.dataset.filter;
      render();
    });
  });
  els.tableBody.addEventListener('click', handleTableAction);
  els.categoryBreakdown.addEventListener('click', handleLimitSave);
  els.emojiSettings.addEventListener('change', handleEmojiInput);
}

function applySettings() {
  els.baseCurrency.value = state.baseCurrency;
  els.themeSelect.value = state.theme;
  els.languageSelect.value = state.language;
  applyTheme();
  applyHeroImage();
  applyLanguage();
  resetFormLabels();
}

function applyTheme() {
  document.body.dataset.theme = state.theme;
}

function applyHeroImage() {
  if (!state.heroImage) {
    els.hero.classList.remove('has-image');
    els.hero.style.removeProperty('--hero-image');
    return;
  }
  els.hero.classList.add('has-image');
  els.hero.style.setProperty('--hero-image', `url(${JSON.stringify(state.heroImage)})`);
}

function applyLanguage() {
  const dictionary = t();
  document.documentElement.lang = state.language;
  document.title = dictionary.appTitle;
  els.welcomeTitle.textContent = dictionary.welcome;
  els.description.placeholder = dictionary.descriptionPlaceholder;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) node.textContent = dictionary[key];
  });
  updateCategoryOptions();
}

function t() {
  return I18N[state.language] || I18N.en;
}

function categoryName(category) {
  return t().categories[category] || category;
}

function categoryEmoji(category) {
  return state.categoryEmojis[category] || DEFAULT_EMOJIS[category] || '';
}

function categoryLabel(category) {
  return `${categoryEmoji(category)} ${categoryName(category)}`;
}

function updateCategoryOptions() {
  const currentValue = els.category.value;
  Array.from(els.category.options).forEach((option) => {
    if (!option.value) {
      option.textContent = t().chooseCategory;
      return;
    }
    option.textContent = categoryLabel(option.value);
  });
  els.category.value = currentValue;
}

function resetFormLabels() {
  const isEditing = Boolean(els.expenseId.value);
  els.submitExpense.textContent = isEditing ? t().updateExpense : t().addExpense;
  els.formTitle.textContent = isEditing ? t().editExpenseTitle : t().addExpense;
}

function startWelcomeScreen() {
  let remaining = 10;
  const updateWelcome = () => {
    const now = new Date();
    els.welcomeTime.textContent = now.toLocaleTimeString(state.language, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    els.welcomeWeekday.textContent = now.toLocaleDateString(state.language, { weekday: 'long' });
    els.welcomeCountdown.textContent = `${t().loading} ${remaining}`;
  };

  updateWelcome();
  const timer = window.setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      window.clearInterval(timer);
      els.welcomeCountdown.textContent = `${t().loading} 0`;
      els.welcomeScreen.classList.add('is-done');
      els.app.removeAttribute('aria-hidden');
      els.app.removeAttribute('inert');
      els.app.classList.remove('is-hidden');
      window.setTimeout(() => els.welcomeScreen.remove(), 750);
      return;
    }
    updateWelcome();
  }, 1000);
}

function setDefaultDate() {
  els.date.value = getToday();
}

function getToday() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function handleHeroImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    state.heroImage = String(reader.result || '');
    try {
      persist(STORAGE_KEYS.heroImage, state.heroImage);
      applyHeroImage();
      showFormError('');
    } catch {
      state.heroImage = '';
      localStorage.removeItem(STORAGE_KEYS.heroImage);
      showFormError(t().photoTooLarge);
    }
    els.heroImage.value = '';
  });
  reader.readAsDataURL(file);
}

function clearHeroImage() {
  state.heroImage = '';
  localStorage.removeItem(STORAGE_KEYS.heroImage);
  applyHeroImage();
}

function handleFormSubmit(event) {
  event.preventDefault();
  const expense = readFormExpense();
  if (!expense) return;

  const editingId = els.expenseId.value;
  if (editingId) {
    state.expenses = state.expenses.map((item) => item.id === editingId ? { ...expense, id: editingId } : item);
  } else {
    state.expenses.unshift({ ...expense, id: createId() });
  }

  persist(STORAGE_KEYS.expenses, state.expenses);
  resetForm();
  render();
}

function readFormExpense() {
  const category = els.category.value;
  const amount = Number(els.amount.value);
  const currency = els.currency.value;
  const date = els.date.value || getToday();
  const description = els.description.value.trim();

  if (!category) {
    showFormError(t().categoryRequired);
    els.category.focus();
    return null;
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    showFormError(t().amountRequired);
    els.amount.focus();
    return null;
  }

  showFormError('');
  return {
    category,
    amount: roundMoney(amount),
    currency,
    date,
    description
  };
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function showFormError(message) {
  els.formError.textContent = message;
}

function resetForm() {
  els.form.reset();
  els.expenseId.value = '';
  els.currency.value = state.baseCurrency;
  setDefaultDate();
  showFormError('');
  resetFormLabels();
  els.cancelEdit.classList.add('is-hidden');
  updateCategoryOptions();
}

function handleTableAction(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const id = button.dataset.id;
  if (button.dataset.action === 'edit') editExpense(id);
  if (button.dataset.action === 'delete') deleteExpense(id);
}

function editExpense(id) {
  const expense = state.expenses.find((item) => item.id === id);
  if (!expense) return;
  els.expenseId.value = expense.id;
  els.category.value = expense.category;
  els.amount.value = expense.amount;
  els.currency.value = expense.currency;
  els.date.value = expense.date;
  els.description.value = expense.description || '';
  resetFormLabels();
  els.cancelEdit.classList.remove('is-hidden');
  els.category.focus();
  els.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function deleteExpense(id) {
  state.expenses = state.expenses.filter((expense) => expense.id !== id);
  persist(STORAGE_KEYS.expenses, state.expenses);
  if (els.expenseId.value === id) resetForm();
  render();
}

function handleLimitSave(event) {
  const button = event.target.closest('button[data-limit-category]');
  if (!button) return;
  const category = button.dataset.limitCategory;
  const input = document.getElementById(`limit-${category}`);
  const value = Number(input.value);

  if (!Number.isFinite(value) || value <= 0) {
    delete state.limits[category];
  } else {
    state.limits[category] = convert(value, state.baseCurrency, 'KZT');
  }
  persist(STORAGE_KEYS.limits, state.limits);
  render();
}

function handleEmojiInput(event) {
  const input = event.target.closest('input[data-emoji-category]');
  if (!input) return;
  const category = input.dataset.emojiCategory;
  state.categoryEmojis[category] = input.value.trim() || DEFAULT_EMOJIS[category];
  persist(STORAGE_KEYS.categoryEmojis, state.categoryEmojis);
  updateCategoryOptions();
  render();
}

function render() {
  const filteredExpenses = getFilteredExpenses();
  const totals = buildCategoryTotals(filteredExpenses);
  renderFilterControls();
  renderSummary(filteredExpenses, totals);
  renderEmojiSettings();
  renderCategoryBreakdown(totals);
  renderExpenseTable(filteredExpenses);
  renderChart(totals);
}

function getFilteredExpenses() {
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  const start = new Date(now);
  if (state.filter === 'week') start.setDate(now.getDate() - 7);
  if (state.filter === 'month') start.setMonth(now.getMonth() - 1);
  start.setHours(0, 0, 0, 0);

  return state.expenses
    .filter((expense) => {
      if (state.filter === 'all') return true;
      const expenseDate = new Date(`${expense.date}T00:00:00`);
      return expenseDate >= start && expenseDate <= now;
    })
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}

function buildCategoryTotals(expenses) {
  return CATEGORIES.reduce((acc, category) => {
    acc[category] = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + convert(expense.amount, expense.currency, state.baseCurrency), 0);
    return acc;
  }, {});
}

function renderFilterControls() {
  const labels = { all: t().allTime, week: t().lastWeek, month: t().lastMonth };
  els.filterLabel.textContent = labels[state.filter];
  els.filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === state.filter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function renderSummary(expenses, totals) {
  const total = sumValues(totals);
  const highest = CATEGORIES
    .map((category) => ({ category, amount: totals[category] }))
    .sort((a, b) => b.amount - a.amount)[0];

  els.totalExpenses.textContent = formatMoney(total, state.baseCurrency);
  els.expenseCount.textContent = String(expenses.length);
  els.highestCategory.textContent = highest && highest.amount > 0 ? categoryLabel(highest.category) : t().none;
  els.highestCategoryAmount.textContent = formatMoney(highest?.amount || 0, state.baseCurrency);
}

function renderEmojiSettings() {
  els.emojiSettings.innerHTML = CATEGORIES.map((category) => `
    <label class="emoji-card" for="emoji-${category}">
      <input class="emoji-input" id="emoji-${category}" data-emoji-category="${category}" maxlength="12" value="${escapeHtml(categoryEmoji(category))}" aria-label="${escapeHtml(categoryName(category))} emoji">
      <span>
        <strong>${escapeHtml(categoryName(category))}</strong>
        <small>${escapeHtml(t().emojiHint)}</small>
      </span>
    </label>
  `).join('');
}

function renderCategoryBreakdown(totals) {
  els.categoryBreakdown.innerHTML = CATEGORIES.map((category) => {
    const amount = totals[category] || 0;
    const limitInKzt = Number(state.limits[category]) || 0;
    const limit = limitInKzt > 0 ? convert(limitInKzt, 'KZT', state.baseCurrency) : 0;
    const percent = limit > 0 ? Math.round((amount / limit) * 100) : 0;
    const overLimit = limit > 0 && amount > limit;
    const progress = limit > 0 ? Math.min(percent, 100) : 0;
    const limitText = limit > 0
      ? `${formatMoney(amount, state.baseCurrency)} / ${formatMoney(limit, state.baseCurrency)}`
      : `${formatMoney(amount, state.baseCurrency)} / ${t().noLimit}`;

    return `
      <article class="category-card ${overLimit ? 'is-over' : ''}" style="--tag-color: ${CATEGORY_COLORS[category]}">
        <div class="category-title">
          <span class="tag">${escapeHtml(categoryLabel(category))}</span>
          ${overLimit ? `<span class="warning-badge">${escapeHtml(t().limitExceeded)}</span>` : ''}
        </div>
        <div class="category-amount">${formatMoney(amount, state.baseCurrency)}</div>
        <div class="progress-track" aria-hidden="true">
          <div class="progress-fill" style="--progress: ${progress}%"></div>
        </div>
        <p class="limit-meta">${escapeHtml(limitText)}${limit > 0 ? ` · ${percent}% ${escapeHtml(t().used)}` : ''}</p>
        <div class="limit-row">
          <label class="field" for="limit-${category}">
            <span>${escapeHtml(t().limitIn)} ${state.baseCurrency}</span>
            <input id="limit-${category}" type="number" min="0" step="0.01" inputmode="decimal" value="${limit || ''}" placeholder="${escapeHtml(t().noLimit)}">
          </label>
          <button class="button mini-button" type="button" data-limit-category="${category}" aria-label="${escapeHtml(t().save)} ${escapeHtml(categoryName(category))}">${escapeHtml(t().save)}</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderExpenseTable(expenses) {
  els.tableBody.innerHTML = expenses.map((expense) => `
    <tr>
      <td><span class="tag" style="--tag-color: ${CATEGORY_COLORS[expense.category]}">${escapeHtml(categoryLabel(expense.category))}</span></td>
      <td class="amount-cell">${formatNumber(expense.amount)}</td>
      <td>${escapeHtml(expense.currency)}</td>
      <td>${escapeHtml(formatDate(expense.date))}</td>
      <td>${escapeHtml(expense.description || t().noDescription)}</td>
      <td>
        <div class="expense-actions">
          <button class="action-button edit-button" type="button" data-action="edit" data-id="${escapeHtml(expense.id)}" aria-label="${escapeHtml(t().edit)} ${escapeHtml(categoryName(expense.category))}">${escapeHtml(t().edit)}</button>
          <button class="action-button delete-button" type="button" data-action="delete" data-id="${escapeHtml(expense.id)}" aria-label="${escapeHtml(t().delete)} ${escapeHtml(categoryName(expense.category))}">${escapeHtml(t().delete)}</button>
        </div>
      </td>
    </tr>
  `).join('');

  const isEmpty = expenses.length === 0;
  els.emptyState.classList.toggle('is-visible', isEmpty);
  els.tableBody.closest('table').classList.toggle('is-hidden', isEmpty);
}

function renderChart(totals) {
  const values = CATEGORIES.map((category) => roundMoney(totals[category] || 0));
  const hasData = values.some((value) => value > 0);
  const chartAvailable = Boolean(window.Chart);
  els.chartEmpty.textContent = hasData && !chartAvailable ? t().chartLoadError : t().addFirstExpense;
  els.chartEmpty.classList.toggle('is-hidden', hasData && chartAvailable);
  els.chartCanvas.classList.toggle('is-hidden', !hasData);

  if (!chartAvailable) return;

  const data = {
    labels: CATEGORIES.map(categoryLabel),
    datasets: [{
      data: values,
      backgroundColor: CATEGORIES.map((category) => CATEGORY_COLORS[category]),
      borderColor: '#fffaf4',
      borderWidth: 4,
      hoverOffset: 8
    }]
  };

  if (!state.chart) {
    state.chart = new Chart(els.chartCanvas, {
      type: 'pie',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: getComputedStyle(document.body).getPropertyValue('--text').trim() || '#4a4874',
              boxWidth: 14,
              padding: 18,
              font: { weight: '700' }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${formatMoney(context.parsed, state.baseCurrency)}`
            }
          }
        }
      }
    });
    return;
  }

  state.chart.data = data;
  state.chart.options.plugins.legend.labels.color = getComputedStyle(document.body).getPropertyValue('--text').trim() || '#4a4874';
  state.chart.update();
}

function exportCsv() {
  const expenses = getFilteredExpenses();
  const rows = [
    [t().date, t().category, t().amount, t().currency, t().description],
    ...expenses.map((expense) => [
      expense.date,
      categoryName(expense.category),
      String(expense.amount),
      expense.currency,
      expense.description || ''
    ])
  ];
  const csv = rows.map((row) => row.map(csvCell).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${t().csvFile}-${getToday()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function persist(key, value) {
  localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
}

function convert(amount, fromCurrency, toCurrency) {
  const inKzt = Number(amount) * RATES_TO_KZT[fromCurrency];
  return roundMoney(inKzt / RATES_TO_KZT[toCurrency]);
}

function sumValues(object) {
  return Object.values(object).reduce((sum, value) => sum + value, 0);
}

function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function formatMoney(amount, currency) {
  return `${formatNumber(amount)} ${currency}`;
}

function formatNumber(value) {
  return new Intl.NumberFormat(state.language, {
    minimumFractionDigits: Number.isInteger(Number(value)) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(roundMoney(value));
}

function formatDate(dateValue) {
  return new Date(`${dateValue}T00:00:00`).toLocaleDateString(state.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
