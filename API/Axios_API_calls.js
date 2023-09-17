import { GET, POST } from '@/utils/axios'

/**
 * @route /payment-report/data-main
 * @param {Object} searchParams {}
 *
 */
export const getDataMain = async (searchParams) => {
  return await GET(`/payment-report/data-main`, {
    useAuthorization: true,
    params: {
      ...(searchParams.client && {
        client: searchParams.client
      }),
      ...(searchParams.country && {
        country: searchParams.country
      }),
      ...(searchParams.dateOption && {
        dateOption: searchParams.dateOption
      }),
      ...(searchParams.endDate && {
        endDate: searchParams.endDate
      }),
      ...(searchParams.startDate && {
        startDate: searchParams.startDate
      }),
      ...(searchParams.keyword && {
        keyword: searchParams.keyword
      }),
      ...(searchParams.survey && {
        survey: searchParams.survey
      }),
      ...(searchParams.project && {
        project: searchParams.project
      }),
      ...(searchParams.published && {
        published: searchParams.published
      }),
      ...(searchParams.suspended && {
        suspended: searchParams.suspended
      }),
      ...(searchParams.page && {
        page: searchParams.page
      }),
      ...(searchParams.limit && {
        limit: searchParams.limit
      })
    }
  })
}

/**
 * @route //
 * @param {Object} payload {}
 *
 */
export const updateReport = async (payload) =>
  await POST(`//`, payload, {
    useAuthorization: true
  })

export const signIn = async formData =>
  await POST('/user-details/login', formData)
