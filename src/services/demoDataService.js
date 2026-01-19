/**
 * Demo Data Store Service
 * Manages local demo data for orders and events
 * Uses localStorage for persistence
 */

// Initialize demo data if not exists
export const initializeDemoData = () => {
  if (!localStorage.getItem('demoInitialized')) {
    // Demo orders
    const demoOrders = [
      {
        id: 'order-1704891234567',
        customer: {
          name: 'Maria Hansen',
          email: 'maria@example.dk',
          phone: '+45 12 34 56 78',
          address: 'Kongevej 123, 1050 København'
        },
        items: [
          {
            id: '1',
            title: 'Portræt i Sort/Hvid',
            quantity: 1,
            price: 299,
            thumbnail: 'https://via.placeholder.com/150'
          }
        ],
        total: 299,
        date: '2025-01-10T10:30:00.000Z',
        status: 'completed'
      },
      {
        id: 'order-1704977634567',
        customer: {
          name: 'Anders Nielsen',
          email: 'anders@example.dk',
          phone: '+45 23 45 67 89',
          address: 'Strandvejen 45, 2100 København'
        },
        items: [
          {
            id: '2',
            title: 'Arkitektonisk Detalje',
            quantity: 2,
            price: 349,
            thumbnail: 'https://via.placeholder.com/150'
          }
        ],
        total: 698,
        date: '2025-01-11T14:20:00.000Z',
        status: 'processing'
      },
      {
        id: 'order-1705064034567',
        customer: {
          name: 'Sophie Larsen',
          email: 'sophie@example.dk',
          phone: '+45 34 56 78 90',
          address: 'Vestergade 78, 8000 Aarhus'
        },
        items: [
          {
            id: '3',
            title: 'Urban Gadeliv',
            quantity: 1,
            price: 299,
            thumbnail: 'https://via.placeholder.com/150'
          },
          {
            id: '4',
            title: 'Mode i Studiet',
            quantity: 1,
            price: 399,
            thumbnail: 'https://via.placeholder.com/150'
          }
        ],
        total: 698,
        date: '2025-01-12T09:45:00.000Z',
        status: 'pending'
      }
    ]

    // Demo events
    const demoEvents = [
      {
        _id: 'event-1',
        name: 'Portrætudstilling 2025',
        slug: 'portraet-2025',
        description: 'Årets portrætfotografier fra studerende',
        startDate: '2025-01-15',
        endDate: '2025-02-28',
        active: true
      },
      {
        _id: 'event-2',
        name: 'Arkitekturudstilling',
        slug: 'arkitektur-2025',
        description: 'Moderne arkitekturfotografi',
        startDate: '2025-02-01',
        endDate: '2025-03-15',
        active: true
      },
      {
        _id: 'event-3',
        name: 'Dokumentar 2024',
        slug: 'dokumentar-2024',
        description: 'Dokumentarfotografi fra sidste år',
        startDate: '2024-11-01',
        endDate: '2024-12-31',
        active: false
      }
    ]

    localStorage.setItem('orders', JSON.stringify(demoOrders))
    localStorage.setItem('demoEvents', JSON.stringify(demoEvents))
    localStorage.setItem('demoInitialized', 'true')
  }
}

// Orders management
export const getOrders = () => {
  const orders = localStorage.getItem('orders')
  return orders ? JSON.parse(orders) : []
}

export const getOrderById = (id) => {
  const orders = getOrders()
  return orders.find(order => order.id === id)
}

export const updateOrderStatus = (id, status) => {
  const orders = getOrders()
  const updated = orders.map(order => 
    order.id === id ? { ...order, status } : order
  )
  localStorage.setItem('orders', JSON.stringify(updated))
  return updated
}

export const deleteOrder = (id) => {
  const orders = getOrders()
  const filtered = orders.filter(order => order.id !== id)
  localStorage.setItem('orders', JSON.stringify(filtered))
  return filtered
}

// Events management
export const getDemoEvents = () => {
  const events = localStorage.getItem('demoEvents')
  return events ? JSON.parse(events) : []
}

export const createDemoEvent = (event) => {
  const events = getDemoEvents()
  const newEvent = {
    _id: 'event-' + Date.now(),
    ...event,
    createdAt: new Date().toISOString()
  }
  events.push(newEvent)
  localStorage.setItem('demoEvents', JSON.stringify(events))
  return newEvent
}

export const updateDemoEvent = (id, updates) => {
  const events = getDemoEvents()
  const updated = events.map(event => 
    event._id === id ? { ...event, ...updates } : event
  )
  localStorage.setItem('demoEvents', JSON.stringify(updated))
  return updated
}

export const deleteDemoEvent = (id) => {
  const events = getDemoEvents()
  const filtered = events.filter(event => event._id !== id)
  localStorage.setItem('demoEvents', JSON.stringify(filtered))
  return filtered
}

// Export orders to CSV
export const exportOrdersToCSV = (orders) => {
  const headers = ['Ordre ID', 'Kunde', 'E-mail', 'Telefon', 'Total', 'Dato', 'Status']
  const rows = orders.map(order => [
    order.id,
    order.customer.name,
    order.customer.email,
    order.customer.phone,
    `${order.total} kr.`,
    new Date(order.date).toLocaleDateString('da-DK'),
    order.status
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `orders-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Statistics
export const getOrderStats = () => {
  const orders = getOrders()
  
  if (!orders || orders.length === 0) {
    return {
      totalRevenue: 0,
      pending: 0,
      processing: 0,
      completed: 0,
      totalOrders: 0
    }
  }
  
  const total = orders.reduce((sum, order) => sum + order.total, 0)
  const pending = orders.filter(o => o.status === 'pending').length
  const processing = orders.filter(o => o.status === 'processing').length
  const completed = orders.filter(o => o.status === 'completed').length

  return {
    totalRevenue: total,
    pending,
    processing,
    completed,
    totalOrders: orders.length
  }
}

export const getEventStats = () => {
  const events = getDemoEvents()
  const total = events.length
  const active = events.filter(e => e.active).length
  const upcoming = events.filter(e => 
    new Date(e.startDate) > new Date()
  ).length

  return {
    total,
    active,
    upcoming
  }
}
