<template>
  <div :key="forceUpdate" class="table-container">
    <table class="user-table">
      <thead>
        <tr>
          <th>{{ $t('users.id') }}</th>
          <th>{{ $t('users.name') }}</th>
          <th>{{ $t('users.email') }}</th>
          <th>{{ $t('users.gender') }}</th>
          <th>{{ $t('users.action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email || '-' }}</td>
          <td>{{ user.gender || '-' }}</td>
          <td>
            <button class="edit-btn" @click="editUser(user)">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { toRefs, ref, onMounted, onBeforeUnmount } from 'vue'
export default {
  props: ['store', 'i18n', 'eventBus'],
  setup (props) {
    let bus = null
    onMounted(() => {
      bus = props.eventBus
      if (bus) {
        bus.$on('store-updated', onStoreUpdated)
      }
    })
    const { users } = toRefs(props.store.state)
    const fetchUsers = () => {
      props.store.actions.fetchUsers()
    }
    const forceUpdate = ref(0)
    const onStoreUpdated = () => {
      forceUpdate.value++
    }
    const editUser = (user) => {
      if (props?.eventBus) {
        props.eventBus.$emit('edit-user', user)
      }
    }
    fetchUsers()

    onBeforeUnmount(() => {
      if (bus) {
        bus.$off('store-updated', onStoreUpdated)
      }
    })

    return {
      users,
      forceUpdate,
      editUser,
    }
  },
}
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
.user-table {
  width: 100%;
  max-width: 700px;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.user-table th,
.user-table td {
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  text-align: left;
}

.user-table th {
  background: #f5f5f5;
  font-weight: 600;
}

.user-table tr:nth-child(even) {
  background: #fafafa;
}

.edit-btn {
  padding: 4px 10px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: #1565c0;
}
</style>