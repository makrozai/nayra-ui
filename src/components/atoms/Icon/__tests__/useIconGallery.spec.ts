import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useIconGallery, VARIANT_ORDER } from '../useIconGallery';

describe('useIconGallery', () => {
  it('expone el catálogo completo de iconos', () => {
    const { result } = renderHook(() => useIconGallery());
    expect(result.current.icons.length).toBeGreaterThan(0);
    expect(result.current.total).toBe(result.current.icons.length);
  });

  it('cada entrada tiene name, variants y primaryVariant', () => {
    const { result } = renderHook(() => useIconGallery());
    for (const icon of result.current.icons) {
      expect(icon.name).toBeTruthy();
      expect(icon.variants.length).toBeGreaterThan(0);
      expect(icon.variants).toContain(icon.primaryVariant);
    }
  });

  it('filtered devuelve todos cuando query está vacío', () => {
    const { result } = renderHook(() => useIconGallery());
    expect(result.current.filtered.length).toBe(result.current.icons.length);
  });

  it('filtra por nombre (case-insensitive)', () => {
    const { result } = renderHook(() => useIconGallery());
    act(() => { result.current.setQuery('STAR'); });
    expect(result.current.filtered.length).toBeGreaterThan(0);
    expect(result.current.filtered.every(i => i.name.toLowerCase().includes('star'))).toBe(true);
  });

  it('filtra parcialmente', () => {
    const { result } = renderHook(() => useIconGallery());
    act(() => { result.current.setQuery('cust'); });
    expect(result.current.filtered.some(i => i.name.includes('custom'))).toBe(true);
  });

  it('devuelve lista vacía sin coincidencias', () => {
    const { result } = renderHook(() => useIconGallery());
    act(() => { result.current.setQuery('xzxzxz_inexistente'); });
    expect(result.current.filtered.length).toBe(0);
  });

  it('iconos ordenados alfabéticamente', () => {
    const { result } = renderHook(() => useIconGallery());
    const names = result.current.icons.map(i => i.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it('el icono custom-star existe en el catálogo', () => {
    const { result } = renderHook(() => useIconGallery());
    const star = result.current.icons.find(i => i.name === 'custom-star');
    expect(star).toBeDefined();
    expect(star!.variants.length).toBeGreaterThan(0);
  });

  it('el icono tech-vue existe con variante colorful', () => {
    const { result } = renderHook(() => useIconGallery());
    const vue = result.current.icons.find(i => i.name === 'tech-vue');
    expect(vue).toBeDefined();
    expect(vue!.variants).toContain('colorful');
  });

  it('primaryVariant sigue el orden solid > regular > brands > colorful', () => {
    const { result } = renderHook(() => useIconGallery());
    for (const icon of result.current.icons) {
      const expected = VARIANT_ORDER.find(v => icon.variants.includes(v));
      expect(icon.primaryVariant).toBe(expected);
    }
  });

  it('total no cambia al modificar query', () => {
    const { result } = renderHook(() => useIconGallery());
    const initialTotal = result.current.total;
    act(() => { result.current.setQuery('star'); });
    expect(result.current.total).toBe(initialTotal);
    expect(result.current.filtered.length).toBeLessThanOrEqual(initialTotal);
  });

  it('restaura todos al limpiar query', () => {
    const { result } = renderHook(() => useIconGallery());
    act(() => { result.current.setQuery('star'); });
    expect(result.current.filtered.length).toBeLessThan(result.current.icons.length);
    act(() => { result.current.setQuery(''); });
    expect(result.current.filtered.length).toBe(result.current.icons.length);
  });
});
