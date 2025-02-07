type FormatOptions = {
  template: string;
  value: string;
  placeholder?: string;
  preserveTemplate?: boolean;
};

type ValidationResult = {
  value: string;
  requiredLength: number;
  isComplete: boolean;
};

/**
 * Formats a string according to a template pattern, replacing placeholder characters with values
 * @example
 * formatString({
 *   template: '+1 (xxx) xxx-xxxx',
 *   value: '+1 (713) 47',
 *   preserveTemplate: true
 * }) // returns '+1 (713) 47'
 */
export const formatString = ({
  template,
  value,
  placeholder = "x",
  preserveTemplate = false,
}: FormatOptions): string => {
  if (preserveTemplate) {
    return preserveTemplateFormat(template, value, placeholder);
  }

  const validation = validateInput(template, value, placeholder);
  return validation.isComplete
    ? formatComplete(template, validation.value, placeholder)
    : formatPartial(template, validation.value, placeholder);
};

/**
 * Preserves the template format and only replaces placeholders
 */
const preserveTemplateFormat = (
  template: string,
  value: string,
  placeholder: string
): string => {
  if (template.startsWith(value)) {
    return value;
  }

  let result = "";
  let valueIndex = 0;
  let inPlaceholderSection = false;
  let templateSection = "";

  for (let i = 0; i < template.length; i++) {
    const currentChar = template[i];

    if (currentChar === placeholder) {
      if (!inPlaceholderSection) {
        result += templateSection;
        templateSection = "";
        inPlaceholderSection = true;
      }

      if (valueIndex < value.length) {
        result += value[valueIndex];
        valueIndex++;
      }
    } else {
      if (inPlaceholderSection) {
        inPlaceholderSection = false;
      }

      templateSection += currentChar;

      if (valueIndex < value.length && value[valueIndex] === currentChar) {
        valueIndex++;
      }
    }
  }

  if (templateSection) {
    result += templateSection;
  }

  return result;
};

/**
 * Validates and prepares the input for formatting
 */
const validateInput = (
  template: string,
  value: string,
  placeholder: string
): ValidationResult => {
  const requiredLength = countPlaceholders(template, placeholder);

  return {
    value,
    requiredLength,
    isComplete: value.length >= requiredLength,
  };
};

/**
 * Counts how many placeholders are in the template
 */
const countPlaceholders = (template: string, placeholder: string): number => {
  return template.split(placeholder).length - 1;
};

/**
 * Formats the string when we have all required digits
 */
const formatComplete = (
  template: string,
  cleanValue: string,
  placeholder: string
): string => {
  let result = template;
  let valueIndex = 0;

  for (let i = 0; i < result.length && valueIndex < cleanValue.length; i++) {
    if (result[i] === placeholder) {
      result = replacePlaceholderAt(result, i, cleanValue[valueIndex]);
      valueIndex++;
    }
  }

  return result;
};

/**
 * Formats the string when we have fewer digits than needed
 */
const formatPartial = (
  template: string,
  cleanValue: string,
  placeholder: string
): string => {
  let result = "";
  let valueIndex = 0;

  for (let i = 0; i < template.length; i++) {
    if (template[i] === placeholder) {
      if (valueIndex < cleanValue.length) {
        result += cleanValue[valueIndex];
        valueIndex++;
      } else {
        break;
      }
    } else {
      result += template[i];
    }
  }

  return result;
};

/**
 * Replaces a character at a specific index in a string
 */
const replacePlaceholderAt = (
  str: string,
  index: number,
  replacement: string
): string => {
  return str.substring(0, index) + replacement + str.substring(index + 1);
};
