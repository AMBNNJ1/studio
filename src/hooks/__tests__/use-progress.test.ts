import { renderHook, act } from '@testing-library/react';
import { useProgress } from '../use-progress';

describe('useProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores lessons and quizzes in localStorage', () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.markLesson('lesson1');
      result.current.markQuiz('quiz1');
    });
    expect(result.current.progress.lessons).toContain('lesson1');
    expect(result.current.progress.quizzes).toContain('quiz1');

    const stored = JSON.parse(localStorage.getItem('ict-progress')!);
    expect(stored.lessons).toContain('lesson1');
    expect(stored.quizzes).toContain('quiz1');
  });

  it('reads existing progress from localStorage', () => {
    localStorage.setItem('ict-progress', JSON.stringify({ lessons: ['l'], quizzes: ['q'] }));
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress.lessons).toContain('l');
    expect(result.current.progress.quizzes).toContain('q');
  });
});
