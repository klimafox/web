# KlímaFox.hu Website

Modern, responsive website for KlímaFox.hu air conditioning company.

## Features
- Responsive design using Tailwind CSS
- Orange and light blue color scheme
- Professional layout with modern design
- Contact form
- Service showcase
- About section
- Mobile-friendly navigation

## Deployment to GitLab Pages

1. Create a new repository on GitLab
2. Upload all files to the repository
3. Create a `.gitlab-ci.yml` file in the root directory (see below)
4. Push your changes to the main branch
5. GitLab will automatically build and deploy your site

Your website will be available at: `https://yourusername.gitlab.io/repository-name`

### GitLab CI Configuration

Create a `.gitlab-ci.yml` file with the following content:

```yaml
pages:
  stage: deploy
  script:
    - mkdir public
    - cp -r * public/
    - rm public/.gitlab-ci.yml
  artifacts:
    paths:
      - public
  only:
    - main
```

## File Structure
