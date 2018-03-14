// Comparisons for question types. Dynamic questions require more input.
export const DYNAMIC = ['choice', 'choices', 'scale'];

// Static questions only really need the question and if they're required.
export const STATIC = ['bullet', 'date', 'integer', 'text'];

// These questions are considered weighted.
export const WEIGHTED = ['choice', 'choices'];
