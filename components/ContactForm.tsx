'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ContactForm.module.css';

interface FormData {
  name: string;
  org: string;
  message: string;
}

interface FormErrors {
  name?: string;
  org?: string;
  message?: string;
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    org: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Check URL params for status from server redirect
  useEffect(() => {
    const urlStatus = searchParams.get('status');
    if (urlStatus === 'sent') {
      setStatus('success');
      setFormData({ name: '', org: '', message: '' });
    } else if (urlStatus === 'error') {
      setStatus('error');
    }
  }, [searchParams]);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    const nameError = validateField('name', formData.name);
    if (nameError) newErrors.name = nameError;
    
    const messageError = validateField('message', formData.message);
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, org: true, message: true });
    
    if (!validateForm()) return;

    setStatus('loading');

    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('org', formData.org);
      formDataObj.append('message', formData.message);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataObj,
        redirect: 'manual',
      });

      // The API redirects, so we check the redirect URL
      if (response.type === 'opaqueredirect' || response.ok || response.status === 303) {
        setStatus('success');
        setFormData({ name: '', org: '', message: '' });
        setTouched({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrors({});
    setTouched({});
  };

  if (status === 'success') {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className={styles.successTitle}>Message Sent!</h3>
        <p className={styles.successText}>
          Thank you for reaching out. We'll get back to you within 1 business day.
        </p>
        <button onClick={resetForm} className="btn btn-secondary">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {status === 'error' && (
        <div className={styles.errorBanner}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>Something went wrong. Please try again.</span>
        </div>
      )}

      <label className={styles.field}>
        <span className={styles.fieldLabel}>
          Name <span className={styles.required}>*</span>
        </span>
        <input
          className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'loading'}
          aria-invalid={errors.name && touched.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && touched.name && (
          <span id="name-error" className={styles.fieldError}>
            {errors.name}
          </span>
        )}
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Organization</span>
        <input
          className={styles.input}
          name="org"
          type="text"
          autoComplete="organization"
          placeholder="Company / org (optional)"
          value={formData.org}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'loading'}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>
          Message <span className={styles.required}>*</span>
        </span>
        <textarea
          className={`${styles.textarea} ${errors.message && touched.message ? styles.inputError : ''}`}
          name="message"
          rows={4}
          placeholder="Tell us what you're building and how we can help"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'loading'}
          aria-invalid={errors.message && touched.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && touched.message && (
          <span id="message-error" className={styles.fieldError}>
            {errors.message}
          </span>
        )}
        <span className={styles.charCount}>
          {formData.message.length} / 10 min
        </span>
      </label>

      <div className={styles.formActions}>
        <button 
          type="submit" 
          className={`btn btn-primary ${styles.submitBtn}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <span className={styles.spinner}></span>
              Sending...
            </>
          ) : (
            <>
              Send inquiry
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
        <p className={styles.formNote}>
          Messages sent to our team email. If you don't see a response, please allow up to 1 business day.
        </p>
      </div>
    </form>
  );
}
