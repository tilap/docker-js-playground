Workflows github:

- API_PUBLISH: quand il y a un merge sur master, publish l'image. DOit ignore certains patch débiles (readme.md)
- API_PR: quand une PR est ouverte, il faut:
  - tester la branche 
    - lint