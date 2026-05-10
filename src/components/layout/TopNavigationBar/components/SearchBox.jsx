import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { getMenuItems } from '@/helpers/menu'
import { useAuthContext } from '@/context/useAuthContext'

/**
 * Flatten nested menu items into a flat list of { label, url, icon, parentLabel }.
 * Only items with a url are included (skip group headers without a direct link).
 */
const flattenMenuItems = (items, parentLabel = '') => {
  const result = []
  for (const item of items) {
    if (item.url) {
      result.push({
        label: item.label,
        url: item.url,
        icon: item.icon || 'iconamoon:arrow-right-2-duotone',
        parentLabel,
      })
    }
    if (item.children) {
      result.push(...flattenMenuItems(item.children, item.label))
    }
  }
  return result
}

const SearchBox = () => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const navigate = useNavigate()
  const { role } = useAuthContext()
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  // Build searchable items from role-filtered menu
  const searchItems = useMemo(() => {
    const menuItems = getMenuItems(role)
    return flattenMenuItems(menuItems)
  }, [role])

  // Filter items based on the query
  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return searchItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.parentLabel.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q),
    )
  }, [query, searchItems])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1)
  }, [results])

  const handleNavigate = useCallback(
    (url) => {
      setQuery('')
      setIsOpen(false)
      navigate(url)
    },
    [navigate],
  )

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && results[activeIndex]) {
        handleNavigate(results[activeIndex].url)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="app-search d-none d-md-block me-auto" ref={wrapperRef} style={{ position: 'relative' }}>
      <div className="position-relative">
        <input
          ref={inputRef}
          type="search"
          className="form-control"
          placeholder="Search pages..."
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <IconifyIcon icon="iconamoon:search-duotone" className="search-widget-icon" />
      </div>

      {/* Search results dropdown */}
      {isOpen && query.trim() && (
        <div
          className="shadow-lg rounded-3 overflow-hidden"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1050,
            maxHeight: 320,
            overflowY: 'auto',
            backgroundColor: 'var(--bs-body-bg)',
            color: 'var(--bs-body-color)',
            border: '1px solid var(--bs-border-color)',
          }}
        >
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={item.url}
                role="button"
                className="d-flex align-items-center gap-2 px-3 py-2"
                style={{
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  borderBottom: '1px solid var(--bs-border-color)',
                  backgroundColor: activeIndex === idx ? 'var(--bs-tertiary-bg)' : 'transparent',
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => handleNavigate(item.url)}
              >
                <IconifyIcon icon={item.icon} className="fs-18 text-primary" />
                <div>
                  <span className="fw-medium d-block" style={{ fontSize: '0.875rem', color: 'var(--bs-body-color)' }}>
                    {item.label}
                  </span>
                  {item.parentLabel && (
                    <small style={{ fontSize: '0.75rem', color: 'var(--bs-secondary-color)' }}>
                      {item.parentLabel}
                    </small>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-3 py-3 text-center" style={{ fontSize: '0.875rem', color: 'var(--bs-secondary-color)' }}>
              <IconifyIcon icon="iconamoon:search-duotone" className="fs-20 d-block mx-auto mb-1 opacity-50" />
              No pages found for "<strong>{query}</strong>"
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default SearchBox
