export function generateLoadingChecker(isLoading: boolean, isFetched: boolean) {
  const loadingChecker = (content: any) =>
    !!(isLoading || (!content && !isFetched))
  return {
    loadingChecker,
    getContent: <Content, Default>(content: Content, defaultContent: Default) =>
      loadingChecker(content) || !content ? defaultContent : content
  }
}
